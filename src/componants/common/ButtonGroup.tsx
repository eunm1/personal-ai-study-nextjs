// src/components/common/ButtonGroup.tsx
import style from "./button.module.css";

interface ButtonGroupProps {
  children: React.ReactNode;
  mode: "web" | "app"; // 💡 현재 화면 모드 전달
}

export default function ButtonGroup({ children, mode }: ButtonGroupProps) {
  const groupClass = mode === "app" ? style.appGroup : style.webGroup;

  return (
    <div className={groupClass}>
      {children}
    </div>
  );
}