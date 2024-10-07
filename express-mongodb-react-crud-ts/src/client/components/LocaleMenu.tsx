import { EnglishIcon } from '../icons/EnglishIcon';
import { IndonesiaIcon } from '../icons/IndonesiaIcon';
import { useAppContext } from '../providers/app-provider';

export const LocaleMenu = () => {

  const { locale, setLocale } = useAppContext();

  const getCurrentLocale = () => {
    return locale === "id" ? <IndonesiaIcon /> : <EnglishIcon />
  }

  return (
    <>
      <label className="dropdown">
        <div className="dd-button">
          {getCurrentLocale()}<div className="dd-button-arrow"></div>
        </div>
        <input type="checkbox" className="dd-input" id="test" />
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
