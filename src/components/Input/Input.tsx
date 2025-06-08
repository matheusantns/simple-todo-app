import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mode: 'add' | 'edit';
};

/**
 * Input is a reusable text input component that supports two visual modes: 'add' and 'edit'.
 *
 * It forwards refs to the underlying <input> element, making it compatible with focus and form libraries.
 *
 * @component
 * @param {InputProps} props - Standard input attributes plus a required `mode` prop to control styling.
 * @param {'add' | 'edit'} props.mode - Controls the input's visual style: 'add' uses one CSS class, 'edit' another.
 * @param {React.Ref<HTMLInputElement>} ref - A forwarded ref to the native input element.
 *
 * @returns {JSX.Element} A styled input element.
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      type="text"
      className={props.mode === 'add' ? styles.addInputTodo : styles.editInputTodo}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
