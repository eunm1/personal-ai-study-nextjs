// src/components/common/Button.tsx
import style from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "gray"; // 💡 파랑 vs 회색
  mode?: "web" | "app";     // 💡 웹 vs 앱(하단 고정)
  children: React.ReactNode;
}

export default function Button({ 
  variant = "blue", 
  mode = "web", 
  children, 
  className,
  ...props 
}: ButtonProps) {
  
  // 💡 모드와 색상에 따른 클래스 결합
  const buttonClass = [
    style.button,
    style[variant], // blue 또는 gray
    mode === "app" ? style.appFixed : style.webDefault,
    className
  ].join(" ");

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}