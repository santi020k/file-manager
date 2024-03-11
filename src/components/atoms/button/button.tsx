import { type ButtonProps, types } from './button.types'

import styles from './button.module.css'

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  const buttonClasses = `${styles.button} ${type === types.primary
    ? styles.primary
    : styles.secondary}`

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

export { ButtonProps, types }
