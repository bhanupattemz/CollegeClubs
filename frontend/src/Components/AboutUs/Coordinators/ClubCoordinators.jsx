import "./CoordinatorComponent.css"
export default function Coordinator() {
    let items = [0, 1, 2, 3, 4, 5, 6];

    return (
        <div className="coordinators-carousel">
            <div className="coordinator-container">
                {items.map((item, inx) => {
                    return (
                        <div key={inx} className="coordinator-card">
                            <div className="coordinator-card-text">
                                <div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere a assumenda quos, at veritatis ducimus sed, culpa sapiente quasi excepturi natus deserunt obcaecati nobis earum tempore vel incidunt aliquid. Asperiores!</p>
                                </div>
                            </div>
                            <div className="coordinator-card-body">

                                <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822503/samples/people/smiling-man.jpg" alt="coordinator-img" />

                                <div className="coordinator-card-naming">
                                    <h3>Name {inx + 1}</h3>
                                    <p>Coordinator</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}