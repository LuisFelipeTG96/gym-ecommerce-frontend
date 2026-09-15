function FormField({ id, label, type, value, onChange, ...rest }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <div className="form-control">
                <input id={id} type={type} value={value} onChange={onChange} {...rest} />
            </div>
        </div>
    );
}

export default FormField;
