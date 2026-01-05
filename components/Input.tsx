import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans">
        {label}
      </label>
      <input 
        className="bg-transparent border-b border-sun-underline py-3 text-lg font-sans text-sun-primary placeholder-sun-border focus:outline-none focus:border-sun-primary transition-colors duration-300"
        {...props}
      />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans">
        {label}
      </label>
      <textarea 
        className="bg-transparent border-b border-sun-underline py-3 text-lg font-sans text-sun-primary placeholder-sun-border focus:outline-none focus:border-sun-primary transition-colors duration-300 resize-none min-h-[80px]"
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-semibold uppercase tracking-widest text-sun-muted font-sans">
        {label}
      </label>
      <div className="relative">
        <select 
          className="w-full bg-transparent border-b border-sun-underline py-3 text-lg font-sans text-sun-primary focus:outline-none focus:border-sun-primary transition-colors duration-300 appearance-none cursor-pointer"
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-sun-tertiary">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};