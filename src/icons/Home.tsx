export function IconHome(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M2 10.562C2 9.58303 2.47763 8.66566 3.27961 8.10427L10.2796 3.20427C11.3126 2.4812 12.6874 2.4812 13.7204 3.20427L20.7204 8.10427C21.5224 8.66566 22 9.58303 22 10.562V19C22 20.6569 20.6569 22 19 22H15C14.4477 22 14 21.5523 14 21V15C14 14.4477 13.5523 14 13 14H11C10.4477 14 10 14.4477 10 15V21C10 21.5523 9.55228 22 9 22H5C3.34315 22 2 20.6569 2 19V10.562Z"
        fill="currentColor"
      />
    </svg>
  );
}
