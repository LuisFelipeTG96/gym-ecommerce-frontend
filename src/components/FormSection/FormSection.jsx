import './FormSection.css'

function FormSection({ title, children }) {
    return (
        <div className="form-section form-section-boxed">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default FormSection;
