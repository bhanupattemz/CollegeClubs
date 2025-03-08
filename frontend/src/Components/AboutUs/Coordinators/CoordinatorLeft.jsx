export default function CoordinatorLeft({ name, description, imageUrl, typeText, period }) {
    if (!name || !description || !typeText || !imageUrl) {
        return
    }
    return (
        <div className="coordinators-head">
            <div className="coordinators-faculty-img">
                <div>
                    <img src={imageUrl} alt={`${typeText}-img`} />
                    {period && <div className="coodinators-left-period">{period}</div>}
                </div>
            </div>
            <div className="coordinators-head-content">
                <h3>{name}</h3>
                <h4>{typeText}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}