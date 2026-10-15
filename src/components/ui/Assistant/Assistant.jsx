import './Assistant.scss';
const Assistant = ({ name, role, email, picture }) => {
  return (
    <article className="assistant">
      <img src={picture} alt={name} />
      <div className="assistant-info">
        <h4 className="assistant-name">{name}</h4>
        <span className="assistant-role">{role}</span>
        <span className="assistant-email">{email}</span>
      </div>
    </article>
  );
};

export default Assistant;