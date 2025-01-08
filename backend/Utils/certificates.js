module.exports.eventCertificate = (user, eventName, prize, images, year, date) => {
    prize = makecorrect(prize)
    year = makecorrect(year)

    return `<div style="background-image: url('https://res.cloudinary.com/delc5g3p5/image/upload/v1729762640/Clubs/v7evosqiqrutrwm4nb60.png'); 
    background-repeat: no-repeat; background-size: cover; background-position: center; display: flex; flex-direction: column; 
    width: 1020px; height: 715px; border: 2px solid black;">
    <h1 style="color: rgb(0, 94, 255); text-align: center; font-weight: 700; margin: 21px 0px 10px 150px;">
        STUDENT CLUBS ASSOCIATION Of JNTUA CEA<br> ANANTHAPURAMU - 515002
    </h1>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
            alt="scajntuacea-log" style="width: 190px; height: 190px; margin-left: 50px;">
        <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1729762640/Clubs/hhcfbr3ivvguqbdkg5qj.png"
            alt="appreciation-img" style="width: 250px; height: 70px; margin: 50px 0px 0px 50px;">
        <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1729762294/Clubs/sdowztfbu0qi5ztpncz9.webp"
            alt="jntuacea-logo" style="width: 150px; height: 150px; margin-right: 100px; margin-top: 10px;">
    </div>
    <div style="margin-left: 300px; margin-right: 50px;">
        <div>
            <p style="font-size: 28px;text-indent: 40px;">This certifies that ${user.gender == "male" ? "Mr." : "Ms."} <strong><i>${user.name}</i></strong>, a student of ${user.course} of the
                <strong><i>${year} year</i></strong>, is appreciated for winning the <strong><i>${prize} prize</i></strong> at
                the
                <strong><i>${eventName}</i></strong> held in ${new Date(date).toISOString().split('T')[0].split('-').reverse().join('-')}.
            </p>
            <div
                style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 80px; font-size: 20px; text-align: center;">
                <div>
                    <img src=${images[0]}
                        alt="factly-coordinator-sign" style="width: 80%;">
                    <strong>Officer In-Charge</strong><br> of Student Clubs<br> JNTUA CEA
                </div>
                <div>
                    <img src=${images[1]}
                        alt="student-coordinator-sign" style="width: 80%;">
                    <strong>Student Coordinator</strong><br> of Student Clubs<br> JNTUA CEA
                </div>
                <div>
                    <img src=${images[2]}
                        alt="Principal-sign" style="width: 80%;">
                    <strong>Principal</strong><br> JNTUA CEA
                </div>
            </div>
        </div>
    </div>
</div>`
}

function makecorrect(number) {
    number = String(number)
    if (number[number.length - 1] == "2") {
        return number + "nd"
    } else if (number[number.length - 1] == "3") {
        return number + "rd"
    } else {
        return number + "st"
    }
}
