import { Link } from 'react-router-dom';

/* eslint-disable-next-line react/prop-types */
export default function Button({
  /* eslint-disable-next-line react/prop-types */
  children,
  /* eslint-disable-next-line react/prop-types */
  to,
  /* eslint-disable-next-line react/prop-types */
  type = 'primary',
  /* eslint-disable-next-line react/prop-types */
  extraStyles,

  ...otherProps
}) {
  const baseStyles =
    `inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-base ${extraStyles} `;

  const styles = {
    primary: baseStyles + 'px-4 py-3 sm:px-6 sm:py-4',
    small: baseStyles + 'px-4 py-2 md:px-5 md:py-2 text-xs sm:text-sm',
    round: baseStyles + 'px-2.5 py-1 md:px-4 md:py-2 text-sm',
    secondary:
      'inline-block rounded-full border-2 border-stone-300 text-sm font-semibold uppercase tracking-wider text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-base px-4 py-3 sm:px-6 sm:py-[0.9rem]',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} {...otherProps}>
      {children}
    </button>
  );
}
