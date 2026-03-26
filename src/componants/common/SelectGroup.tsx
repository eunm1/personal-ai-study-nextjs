// src/components/common/SelectGroup.tsx
import style from "./select-group.module.css";

interface Option {
  id? : string;
  value: string; // 내부 로직용 값 (예: 'warm')
  label: string; // 화면 표시용 이름 (예: '따뜻한 오후')
  discription?: string;
}

interface SelectGroupProps {
  options: Option[];
  selectType: 'checkbox' | 'radio';
  selectedValue: string | string[]; // 💡 단일(string) 또는 중복(string[]) 지원
  onChange: (value: string) => void; // 💡 부모에게 어떤 값이 클릭됐는지 전달
  columnCount?: number; // 💡 한 줄에 몇 개씩 보여줄지 (선택 사항)
  name: string;
}

export default function SelectGroup({ 
  name,
  options, 
  selectedValue, 
  selectType='radio',
  onChange, 
  columnCount = 5 
}: SelectGroupProps) {

    const isChecked = (val: string) => {
    // 💡 checkbox 모드일 때는 배열 안에 값이 있는지 확인
    if (Array.isArray(selectedValue)) {
        return selectedValue.includes(val);
    }
    // radio 모드일 때는 단일 값 비교
    return selectedValue === val;
    };

  return (
    <div 
      className={style.container} 
      style={{ '--column-count': columnCount } as React.CSSProperties}
    >
      {options.map((opt) => (
        <label 
            key={opt.value} 
            className={`${style.styleLabel} ${isChecked(opt.value) ? style.active : ''}`}>
              <input 
              type={selectType} 
              name={name}
              value={opt.value} 
              checked={isChecked(opt.value)}
              onChange={() => onChange(opt.value)}
              className={style.labelArea}
              />
              {opt.label}
        </label>
        ))}
    </div>
  );
}

/***
 * 
 *  checkbox일때 부모 화면에서 사용하는 방법
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 💡 초기값은 빈 배열
  const handleTagChange = (clickedValue: string) => {
    setSelectedTags((prev) => {
      // 1. 이미 선택된 배열에 클릭한 값이 있는지 확인
      if (prev.includes(clickedValue)) {
        // 2. 이미 있다면? 해당 값을 제외한 나머지만 남김 (체크 해제)
        return prev.filter((value) => value !== clickedValue);
      } else {
        // 3. 없다면? 기존 배열에 새로운 값을 추가 (체크 선택)
        return [...prev, clickedValue];
      }
    });
  };

 */