'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import ProfileCard from '@/components/profile/ProfileCard';
import AIStyleSelector from '@/components/profile/AIStyleSelector';
import ProfileForm from '@/components/profile/ProfileForm';
import UsageStats from '@/components/profile/UsageStats';
import DataManagement from '@/components/profile/DataManagement';
import AlertModal from '@/components/profile/AlertModal';
import ConfirmModal from '@/components/profile/ConfirmModal';
import LoadingScreen from '@/components/profile/LoadingScreen';

type AIStyle = 'auto' | 'cold' | 'warm';

interface ProfileData {
  name: string;
  nickname: string;
  phone: string;
  birthday: string;
  job: string;
  email: string;
  aiStyle: AIStyle;
}

interface UsageStatsData {
  totalRecords: number;
  mostCommonEmotion: string;
  averageIntensity: number;
  emotionTypes: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [aiStyle, setAiStyle] = useState<AIStyle>('auto');
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phone: '',
    birthday: '',
    job: '',
  });
  const [email, setEmail] = useState('');
  const [usageStats, setUsageStats] = useState<UsageStatsData>({
    totalRecords: 0,
    mostCommonEmotion: '-',
    averageIntensity: 0,
    emotionTypes: 0,
  });
  const [modal, setModal] = useState<{
    title: string;
    description: string;
    type: 'success' | 'error' | 'confirm';
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // API에서 프로필 데이터 로드
  useEffect(() => {
    const loadProfileFromAPI = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();

          setEmail(data.email || '');
          setFormData({
            name: data.name || '',
            nickname: data.nickname || '',
            phone: data.phoneNumber || '',
            birthday: data.birthDate
              ? new Date(data.birthDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              : '',
            job: data.job || '',
          });

          // aiStyle enum을 lowercase로 변환
          const aiStyleValue = data.aiStyle?.toLowerCase() || 'auto';
          setAiStyle(aiStyleValue as AIStyle);
        }
      } catch (error) {
        console.error('Failed to load profile from API:', error);
      }
    };

    loadProfileFromAPI();
  }, [session]);

  // 사용 통계 로드
  useEffect(() => {
    const loadUsageStats = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch('/api/profile/stats');
        if (response.ok) {
          const data = await response.json();
          setUsageStats(data);
        }
      } catch (error) {
        console.error('Failed to load usage stats:', error);
      }
    };

    loadUsageStats();
  }, [session]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    try {
      // 생년월일 포맷 변환 (YYYY. MM. DD -> YYYY-MM-DD)
      let birthDateISO = null;
      if (formData.birthday) {
        const cleanedDate = formData.birthday
          .replace(/\s/g, '')
          .replace(/\./g, '-');
        birthDateISO = cleanedDate;
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          nickname: formData.nickname,
          phoneNumber: formData.phone,
          birthDate: birthDateISO,
          job: formData.job,
          aiStyle,
        }),
      });

      if (response.ok) {
        showModal(
          '저장이 완료되었어요',
          '새로운 프로필로 적용되어 분석합니다',
          'success'
        );
      } else {
        showModal('저장 실패', '프로필 저장에 실패했습니다.', 'error');
      }
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
  const executeExportData = () => {
    try {
      const allData = {
        profile: {
          ...formData,
          email,
          aiStyle,
        },
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(allData, null, 2)], {
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
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const importedData = JSON.parse(result);

          if (importedData.profile) {
            const profile = importedData.profile;
            setFormData({
              name: profile.name || '',
              nickname: profile.nickname || '',
              phone: profile.phone || '',
              birthday: profile.birthday || '',
              job: profile.job || '',
            });
            setEmail(profile.email || '');
            setAiStyle(profile.aiStyle || 'auto');

            showModal(
              '가져오기 완료',
              '데이터를 성공적으로 가져왔습니다!',
              'success'
            );
          }
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
      const response = await fetch('/api/profile', {
        method: 'DELETE',
      });

      if (response.ok) {
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
      } else {
        showModal('삭제 실패', '데이터 삭제에 실패했습니다.', 'error');
      }
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
      showModal(
        '로그아웃 실패',
        '로그아웃 처리 중 오류가 발생했습니다.',
        'error'
      );
    }
  };

  return (
    <div className="bg-bg relative min-h-screen w-full">
      {/* GNB */}
      <div className="bg-bg px-g5 mx-auto box-border flex h-[56px] w-full max-w-[430px] content-stretch items-center gap-[10px] overflow-clip py-[10px]">
        <p className="text-black-200 relative shrink-0 text-center text-h5 font-semibold text-nowrap whitespace-pre not-italic">
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
