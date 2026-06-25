export default function InfoCircle(
  props: Readonly<React.SVGProps<SVGSVGElement>>,
) {
  return (
    <svg
      data-dc-tpl="129"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      {...props}
    >
      <circle data-dc-tpl="130" cx="12" cy="12" r="9"></circle>
      <path data-dc-tpl="131" d="M12 8v4M12 16h.01"></path>
    </svg>
  );
}
