'use client';

import { useState } from 'react';

import AIStyleSelector from '@/components/profile/AIStyleSelector';
import AlertModal from '@/components/profile/AlertModal';
import ConfirmModal from '@/components/profile/ConfirmModal';
import DataManagement from '@/components/profile/DataManagement';
import LoadingScreen from '@/components/profile/LoadingScreen';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileForm from '@/components/profile/ProfileForm';
import UsageStats from '@/components/profile/UsageStats';

import {
  updateProfile,
  deleteProfileData,
  getAllUserData,
  restoreUserData,
} from '@/actions/profile';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

type AIStyle = 'auto' | 'cold' | 'warm';

interface UsageStatsData {
  totalRecords: number;
  mostCommonEmotion: string;
  averageIntensity: number;
  emotionTypes: number;
}

interface ProfileClientPageProps {
  initialProfile: {
    name: string | null;
    email: string;
    nickname: string | null;
    phoneNumber: string | null;
    birthDate: string | null;
    job: string | null;
    aiStyle: string;
  };
  initialStats: UsageStatsData;
}

export default function ProfileClientPage({
  initialProfile,
  initialStats,
}: ProfileClientPageProps) {
  const router = useRouter();
  // session is still useful for client-side auth checks if needed, but data comes from props
  const { data: session } = authClient.useSession();

  const [aiStyle, setAiStyle] = useState<AIStyle>(
    ((initialProfile.aiStyle as string)?.toLowerCase() as AIStyle) || 'auto'
  );
  const [formData, setFormData] = useState({
    name: initialProfile.name || '',
    nickname: initialProfile.nickname || '',
    phone: initialProfile.phoneNumber || '',
    birthday: initialProfile.birthDate
      ? (() => {
          const d = new Date(initialProfile.birthDate);
          return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
        })()
      : '',
    job: initialProfile.job || '',
  });
  const [email, setEmail] = useState(initialProfile.email || '');
  const [usageStats, setUsageStats] = useState<UsageStatsData>(initialStats);
  const [modal, setModal] = useState<{
    title: string;
    description: string;
    type: 'success' | 'error' | 'confirm';
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 3 && cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    return cleaned;
  };

  const formatBirthDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 4 && cleaned.length <= 6) {
      return `${cleaned.slice(0, 4)}. ${cleaned.slice(4)}`;
    } else if (cleaned.length > 6) {
      return `${cleaned.slice(0, 4)}. ${cleaned.slice(4, 6)}. ${cleaned.slice(6, 8)}`;
    }
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    let newValue = value;
    if (field === 'phone') {
      newValue = formatPhoneNumber(value);
    } else if (field === 'birthday') {
      newValue = formatBirthDate(value);
    }

    setFormData((prev) => ({ ...prev, [field]: newValue }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
      isValid = false;
    }

    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요';
      isValid = false;
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요';
      isValid = false;
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 형식으로 입력해주세요 (예: 010-1234-5678)';
      isValid = false;
    }

    if (!formData.birthday) {
      newErrors.birthday = '생년월일을 입력해주세요';
      isValid = false;
    } else if (!/^\d{4}\.\s?\d{2}\.\s?\d{2}$/.test(formData.birthday)) {
      newErrors.birthday = '올바른 형식으로 입력해주세요 (예: 2000. 01. 01)';
      isValid = false;
    }

    if (!formData.job) {
      newErrors.job = '직업을 입력해주세요';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const showModal = (
    title: string,
    description: string,
    type: 'success' | 'error' | 'confirm' = 'success'
  ) => {
    setModal({ title, description, type });
  };

  // 프로필 데이터 저장
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      showModal('입력 확인', '입력된 정보를 다시 확인해주세요.', 'error');
      return;
    }

    try {
      // 생년월일 포맷 변환 (YYYY. MM. DD -> YYYY-MM-DD)
      let birthDateISO = null;
      if (formData.birthday) {
        // 공백 제거
        let cleaned = formData.birthday.replace(/\s/g, '');
        // 마지막 점 제거 (예: 2000.01.01. -> 2000.01.01)
        if (cleaned.endsWith('.')) {
          cleaned = cleaned.slice(0, -1);
        }
        // 점을 하이픈으로 변경
        const cleanedDate = cleaned.replace(/\./g, '-');

        // 날짜 유효성 확인
        const date = new Date(cleanedDate);
        if (!isNaN(date.getTime())) {
          birthDateISO = cleanedDate;
        }
      }

      await updateProfile({
        name: formData.name,
        nickname: formData.nickname,
        phoneNumber: formData.phone,
        birthDate: birthDateISO,
        job: formData.job,
        aiStyle,
      });

      showModal('저장이 완료되었어요', '새로운 프로필로 적용되어 분석합니다', 'success');
    } catch (error) {
      console.error('Failed to save profile:', error);
      showModal('저장 실패', '프로필 저장에 실패했습니다.', 'error');
    }
  };

  // 데이터 내보내기 확인 모달 열기
  const handleExportData = () => {
    setShowExportModal(true);
  };

  // 실제 데이터 내보내기 실행
  const executeExportData = async () => {
    try {
      const allData = await getAllUserData();

      const exportData = {
        profile: {
          name: allData.name,
          nickname: allData.nickname,
          phoneNumber: allData.phoneNumber,
          birthDate: allData.birthDate,
          job: allData.job,
          email: allData.email,
          aiStyle: allData.aiStyle,
        },
        diaries: allData.diaries,
        chats: allData.chats,
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `soulbin-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowExportModal(false);
      showModal(
        '정보를 외부에 저장했어요',
        '민감한 주제/내용이 없는지 확인 후 공유하세요',
        'success'
      );
    } catch (error) {
      console.error('Failed to export data:', error);
      setShowExportModal(false);
      showModal('내보내기 실패', '데이터 내보내기에 실패했습니다.', 'error');
    }
  };

  // 데이터 가져오기 (JSON 업로드)
  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const importedData = JSON.parse(result);

          // 서버 액션을 통해 데이터 복원
          await restoreUserData(importedData);

          // UI 업데이트 (프로필 정보)
          if (importedData.profile) {
            const profile = importedData.profile;
            setFormData({
              name: profile.name || '',
              nickname: profile.nickname || '',
              phone: profile.phoneNumber || '', // exportData 키와 일치시킴
              birthday: profile.birthDate
                ? (() => {
                    const d = new Date(profile.birthDate);
                    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
                  })()
                : '',
              job: profile.job || '',
            });
            setEmail(profile.email || '');
            setAiStyle(((profile.aiStyle as string)?.toLowerCase() as AIStyle) || 'auto');
          }

          showModal('가져오기 완료', '데이터를 성공적으로 가져왔습니다!', 'success');
        }
      } catch (error) {
        console.error('Failed to import data:', error);
        showModal('가져오기 실패', '잘못된 파일 형식입니다.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // 모든 데이터 삭제
  const handleDeleteAllData = async () => {
    try {
      await deleteProfileData();

      setFormData({
        name: '',
        nickname: '',
        phone: '',
        birthday: '',
        job: '',
      });
      setAiStyle('auto');
      setShowDeleteModal(false);
      showModal('삭제 완료', '모든 데이터가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('Failed to delete data:', error);
      showModal('삭제 실패', '데이터 삭제에 실패했습니다.', 'error');
    }
  };

  // 로그아웃 확인 모달 열기
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // 실제 로그아웃 실행
  const executeLogout = async () => {
    setShowLogoutModal(false);
    setShowLoading(true);

    try {
      // BetterAuth 로그아웃 처리
      await authClient.signOut();

      // 로딩 애니메이션을 보여주기 위해 약간의 딜레이 후 메인 화면으로 이동
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      setShowLoading(false);
      showModal('로그아웃 실패', '로그아웃 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="bg-bg relative min-h-screen w-full">
      {/* GNB */}
      <div className="bg-bg px-g5 mx-auto box-border flex h-[56px] w-full max-w-[430px] content-stretch items-center gap-[10px] overflow-clip py-[10px]">
        <p className="text-black-200 text-h5 relative shrink-0 text-center font-semibold text-nowrap whitespace-pre not-italic">
          내 프로필
        </p>
      </div>

      {/* Contents */}
      <div className="gap-g2 px-g3 py-g0 mx-auto box-border flex w-full max-w-[430px] flex-col content-stretch items-start overflow-clip">
        {/* 프로필 카드 */}
        <ProfileCard
          name={formData.name}
          job={formData.job}
          email={email}
          onLogout={handleLogout}
        />

        {/* AI 답변 스타일 */}
        <AIStyleSelector value={aiStyle} onChange={setAiStyle} />

        {/* 내 정보 */}
        <ProfileForm
          formData={formData}
          onChange={handleInputChange}
          onSave={handleSaveProfile}
          errors={errors}
        />

        {/* 사용 통계 */}
        <UsageStats stats={usageStats} />

        {/* 데이터 관리 */}
        <DataManagement
          onExport={handleExportData}
          onImport={handleImportData}
          onDelete={() => setShowDeleteModal(true)}
        />

        {/* Bottom spacing for navigation */}
        <div className="h-4" />
      </div>

      {/* 알림 모달 */}
      {modal && (
        <AlertModal
          title={modal.title}
          description={modal.description}
          onClose={() => setModal(null)}
        />
      )}

      {/* 내보내기 확인 모달 */}
      {showExportModal && (
        <ConfirmModal
          title="정보를 내보내시겠어요?"
          description="민감한 주제/내용이 없는지 확인 후 공유하세요"
          confirmText="내보내기"
          onConfirm={executeExportData}
          onCancel={() => setShowExportModal(false)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <ConfirmModal
          title="정말 삭제하시겠어요?"
          description="모든 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다"
          confirmText="삭제"
          confirmColor="red"
          onConfirm={handleDeleteAllData}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* 로그아웃 확인 모달 */}
      {showLogoutModal && (
        <ConfirmModal
          title="로그아웃할까요?"
          description="메인 화면으로 이동합니다"
          confirmText="로그아웃"
          confirmColor="red"
          onConfirm={executeLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* 로딩 화면 */}
      {showLoading && <LoadingScreen />}
    </div>
  );
}
