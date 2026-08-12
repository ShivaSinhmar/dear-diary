
import "./ThoughtInput.css";

interface ThoughtInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

const ThoughtInput = ({
  value,
  onChange,
  onSubmit,
}: ThoughtInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="thought-input-wrapper">
      <input
        type="text"
        className="thought-input"
        placeholder="what's on your mind today"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <button
          className="thought-submit"
          onClick={onSubmit}
          aria-label="Submit thought"
        >
          →
        </button>
      )}
    </div>
  );
};

export default ThoughtInput;

