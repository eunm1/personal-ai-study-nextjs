"use client";
import { useState } from "react";
import Modal from "@/componants/common/modal/Modal";
import { ModalProps } from "@/types/common-types";
import "@/styles/modal.css"; // 👈 CSS 임포트 잊지 마세요!

// 💡 오류 수정: Props 타입을 올바르게 정의합니다.
interface PostPasswordModalProps extends Omit<ModalProps, 'title' | 'children'> {
  onSuccess: () => void;
  isAdmin?: boolean;
}

export default function PostPasswordModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  isAdmin = false 
}: PostPasswordModalProps) {
  const [pw, setPw] = useState("");

  const handleConfirm = () => {
    if (isAdmin || pw === "1234") {
      onSuccess();
      setPw("");
    } else {
      alert("비밀번호가 틀렸습니다! 👿");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="권한 확인">
      <div className="pw-modal-container">
        <p className="pw-modal-desc">수정을 위해 비밀번호를 입력해주세요.</p>
        <input
          type="password"
          className="pw-modal-input"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          autoFocus
          placeholder="Password"
        />
        <div className="pw-modal-footer">
          <button onClick={onClose} className="btn-cancel">취소</button>
          <button onClick={handleConfirm} className="btn-confirm">확인</button>
        </div>
      </div>
    </Modal>
  );
}