function Button({ text, onClick, type = 'button', variant = 'primary', disabled = false }) {
  return (
    <button className={`btn btn-${variant}`} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
