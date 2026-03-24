"use client";

import { createPortal } from "react-dom"
import style from "./modal.module.css"
import { ReactNode, use, useEffect, useRef } from "react"
import { useRouter } from "next/navigation";

export default function Modal({children, params} : {children: ReactNode, params:Promise<{ id: string }>}){

    const router = useRouter();
    const { id } = use(params);
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    ///모달 컴포넌트가 최 상단으로 올라가면
    useEffect(()=>{
        if(!dialogRef.current?.open){ //모달이 현재 닫혀있을 경우
            dialogRef.current?.showModal(); //보이게 한다
            dialogRef.current?.scrollTo({ //스크롤이 최 상단으로 올라가게 한다
                top: 0,
            })
        }
    },[]);


    return createPortal(
        <dialog
            onClose={()=> router.back()} //esc 눌렀을 때
            onClick={(e)=>{
                //모달의 배경이 클리이 된거면 -> 뒤로가기
                if((e.target as any).nodeName === 'DIALOG') { //모달 클릭시 nodename은 DIALOG이다
                    router.back();
                }
            }}
            className={style.modal}
            ref={dialogRef}
        >
            <button 
                className={style.closeButton} 
                onClick={() => router.back()}
                aria-label="닫기"
            >
                &times; 
            </button>

            <div className={style.content}>
                {children}
            </div>
        </dialog>, 
        document.getElementById('modal-root') as HTMLElement
    );
}