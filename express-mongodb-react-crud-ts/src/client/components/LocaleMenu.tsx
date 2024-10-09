import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { EnglishIcon } from '../icons/EnglishIcon';
import { IndonesiaIcon } from '../icons/IndonesiaIcon';
import { useAppContext } from '../providers/app-provider';

export const LocaleMenu = () => {

  const { locale, setLocale } = useAppContext();

  const [checked, setChecked] = useState<boolean>(false);

  const ref = useRef<HTMLLabelElement>(null);

  useClickOutside(ref, () => {
    if (checked) {
      setChecked(false);
    }
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const getCurrentLocale = () => {
    return locale === "id" ? <IndonesiaIcon /> : <EnglishIcon />
  }

  return (
    <>
      <label className="dropdown" ref={ref}>
        <div className="dd-button">
          {getCurrentLocale()}
          <div className="dd-button-arrow"></div>
        </div>
        <input type="checkbox" className="dd-input" id="test" checked={checked} onChange={onChangeHandler} />
        <ul className="dd-menu">
          <li>
            <a onClick={(e) => {
              e.preventDefault();
              setLocale('en');
            }}>
              <EnglishIcon />
              <span>English</span>
            </a>
          </li>
          <li>
            <a onClick={(e) => {
              e.preventDefault();
              setLocale('id')
            }}>
              <IndonesiaIcon />
              <span>Indonesia</span>
            </a>
          </li>
        </ul>
      </label>
    </>
  )
}
