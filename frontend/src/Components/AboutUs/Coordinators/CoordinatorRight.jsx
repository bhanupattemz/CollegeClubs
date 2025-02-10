import "./CoordinatorComponent.css"
export default function CoordinatorRight({ name, description, imageUrl, typeText, period }) {
    if (!name || !description || !typeText || !imageUrl) {
        console.log(name, description, typeText, imageUrl)
        return
    }
    return (
        <div className="coordinators-head coordinator-student-head">
            <div className="coordinators-head-content">
                <h3>{name}</h3>
                <h4>{typeText}</h4>
                <p>{description}</p>
            </div>
            <div className="coordinators-student-img">
                <div>
                    <img src={imageUrl} alt={`${typeText}-img`} />
                    {period && <div className="coodinators-right-period">{period}</div>}

                </div>
            </div>
        </div>
    )
}