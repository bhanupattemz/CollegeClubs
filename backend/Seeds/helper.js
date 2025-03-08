module.exports.clubs = [
    {
        name: "Tech Explorers",
        bannerImage: {
            public_id: "banner1",
            url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
        },
        logo: {
            public_id: "logo1",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
        },
        skills: ["Coding", "AI/ML", "Robotics"],
        description: "Tech Explorers is a vibrant club focusing on cutting-edge technologies and hands-on projects. Join us for an exciting learning journey.",
        type: "technical",
        timings: [
            { day: "Mon", time: "4:00 PM - 6:00 PM" },
            { day: "Thu", time: "5:00 PM - 7:00 PM" }
        ],
        venue: {
            venueName: "Tech Hall",
            landMark: "Near Library"
        },
        registrationTiming: {
            starting: new Date(),
            ending: new Date(new Date().setDate(new Date().getDate() + 10)) // 10 days from now
        },
        coordinators: [
            "671a450895807740ef653745",
            "671a450895807740ef653745"
        ]
    },
    {
        name: "Cultural Vibes",
        bannerImage: {
            public_id: "banner2",
            url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
        },
        logo: {
            public_id: "logo2",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
        },
        skills: ["Dance", "Music", "Drama"],
        description: "Cultural Vibes celebrates artistic expression through events and workshops in music, dance, and theatre.",
        type: "cultural",
        timings: [
            { day: "Wed", time: "3:00 PM - 5:00 PM" },
            { day: "Fri", time: "4:00 PM - 6:00 PM" }
        ],
        venue: {
            venueName: "Cultural Arena",
            landMark: "Beside Auditorium"
        },
        registrationTiming: {
            starting: new Date(new Date().setDate(new Date().getDate() + 5)), // Opens in 5 days
            ending: new Date(new Date().setDate(new Date().getDate() + 15)) // 15 days from now
        },
        coordinators: [
            "671a450895807740ef653745",
            "671a450895807740ef653745"
        ]
    },
    {
        name: "Fitness Enthusiasts",
        bannerImage: {
            public_id: "banner3",
            url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
        },
        logo: {
            public_id: "logo3",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
        },
        skills: ["Yoga", "Aerobics", "Fitness"],
        description: "A community for fitness enthusiasts, hosting daily workouts, yoga sessions, and health awareness programs.",
        type: "sports",
        timings: [
            { day: "Tue", time: "6:00 AM - 7:00 AM" },
            { day: "Sat", time: "5:00 PM - 6:00 PM" }
        ],
        venue: {
            venueName: "Sports Complex",
            landMark: "Near Gym"
        },
        registrationTiming: {
            starting: new Date(),
            ending: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days from now
        },
        coordinators: [
            "671a450895807740ef653745",
            "671a450895807740ef653745"
        ]
    },
    {
        name: "Social Connect",
        bannerImage: {
            public_id: "banner4",
            url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
        },
        logo: {
            public_id: "logo4",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
        },
        skills: ["Leadership", "Public Speaking", "Community Service"],
        description: "Social Connect focuses on building leadership skills and engaging in meaningful community services.",
        type: "social",
        timings: [
            { day: "Thu", time: "4:00 PM - 6:00 PM" },
            { day: "Sat", time: "10:00 AM - 12:00 PM" }
        ],
        venue: {
            venueName: "Community Hall",
            landMark: "Near Cafeteria"
        },
        registrationTiming: {
            starting: new Date(new Date().setDate(new Date().getDate() + 3)), // Opens in 3 days
            ending: new Date(new Date().setDate(new Date().getDate() + 12)) // 12 days from now
        },
        coordinators: [
            "671a450895807740ef653745",
            "671a450895807740ef653745"
        ]
    },
    {
        name: "Academic Achievers",
        bannerImage: {
            public_id: "banner5",
            url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
        },
        logo: {
            public_id: "logo5",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png"
        },
        skills: ["Research", "Competitive Exams", "Peer Tutoring"],
        description: "A platform for academic excellence, hosting workshops and study groups to achieve success.",
        type: "academic",
        timings: [
            { day: "Wed", time: "5:00 PM - 6:30 PM" },
            { day: "Sun", time: "10:00 AM - 12:00 PM" }
        ],
        venue: {
            venueName: "Academic Wing",
            landMark: "2nd Floor, Main Building"
        },
        registrationTiming: {
            starting: new Date(),
            ending: new Date(new Date().setDate(new Date().getDate() + 20)) // 20 days from now
        },
        coordinators: [
            "671a450895807740ef653745",
            "671a450895807740ef653745"
        ]
    }
];


module.exports.events = [
    {
        "name": "TechFest 2024",
        "description": "TechFest 2024 is a premier event showcasing technological advancements and providing a platform for students to exhibit their technical skills. Join us for workshops, hackathons, and keynote sessions.",
        "timings": {
            "starting": "2024-01-15T09:00:00.000Z",
            "ending": "2024-01-15T17:00:00.000Z"
        },
        "venue": {
            "venueName": "Main Auditorium",
            "landMark": "Near Library Block"
        },
        "image": {
            "public_id": "event_img_001",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    },
    {
        "name": "Cultural Night 2024",
        "description": "An evening filled with cultural performances including music, dance, and drama to celebrate diversity and talent.",
        "timings": {
            "starting": "2024-02-20T18:00:00.000Z",
            "ending": "2024-02-20T21:00:00.000Z"
        },
        "venue": {
            "venueName": "Open Air Theater",
            "landMark": "Behind CSE Department"
        },
        "image": {
            "public_id": "event_img_002",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    },
    {
        "name": "Sports Day 2024",
        "description": "A day dedicated to sports and athletics, where students compete in various games and showcase their sportsmanship.",
        "timings": {
            "starting": "2024-03-10T08:00:00.000Z",
            "ending": "2024-03-10T16:00:00.000Z"
        },
        "venue": {
            "venueName": "Sports Ground",
            "landMark": "Near Hostel Block"
        },
        "image": {
            "public_id": "event_img_003",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    },
    {
        "name": "Hackathon 2024",
        "description": "A 24-hour coding marathon where students work in teams to solve real-world problems using technology.",
        "timings": {
            "starting": "2024-04-05T10:00:00.000Z",
            "ending": "2024-04-06T10:00:00.000Z"
        },
        "venue": {
            "venueName": "Innovation Lab",
            "landMark": "Ground Floor, Admin Building"
        },
        "image": {
            "public_id": "event_img_004",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    },
    {
        "name": "Alumni Meet 2024",
        "description": "Reconnect with our alumni network during this special gathering filled with memories and networking opportunities.",
        "timings": {
            "starting": "2024-05-12T10:00:00.000Z",
            "ending": "2024-05-12T14:00:00.000Z"
        },
        "venue": {
            "venueName": "Conference Hall",
            "landMark": "Second Floor, Admin Block"
        },
        "image": {
            "public_id": "event_img_005",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    },

    {
        "name": "CodeSprint 2024",
        "description": "An exciting coding competition where participants solve challenging problems to win amazing prizes.",
        "timings": {
            "starting": "2024-01-25T10:00:00.000Z",
            "ending": "2024-01-25T17:00:00.000Z"
        },
        "venue": {
            "venueName": "Tech Park Hall",
            "landMark": "Near IT Department"
        },
        "image": {
            "public_id": "event_img_006",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        },
        "winner": [
            {
                "admissionNo": "20CSE101",
                "name": "Aryan Kumar",
                "course": "b-tech",
                "gender": "male",
                "academicYear": 3
            }
        ]
    },
    {
        "name": "Science Expo 2024",
        "description": "A platform to showcase innovative science projects and ideas, with exciting prizes for the best exhibits.",
        "timings": {
            "starting": "2024-02-10T09:00:00.000Z",
            "ending": "2024-02-10T16:00:00.000Z"
        },
        "venue": {
            "venueName": "Exhibition Hall",
            "landMark": "Near Chemistry Department"
        },
        "image": {
            "public_id": "event_img_007",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        },
        "winner": [
            {
                "admissionNo": "20ECE201",
                "name": "Nisha Mehta",
                "course": "b-tech",
                "gender": "female",
                "academicYear": 4
            },
            {
                "admissionNo": "20EEE102",
                "name": "Rahul Sharma",
                "course": "b-tech",
                "gender": "male",
                "academicYear": 4
            }
        ]
    },
    {
        "name": "Music Fiesta 2024",
        "description": "An enchanting musical evening with performances by talented students and thrilling competitions.",
        "timings": {
            "starting": "2024-03-20T17:00:00.000Z",
            "ending": "2024-03-20T20:00:00.000Z"
        },
        "venue": {
            "venueName": "Cultural Arena",
            "landMark": "Near Auditorium"
        },
        "image": {
            "public_id": "event_img_008",
            "url": "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        },
        "winner": [
            {
                "admissionNo": "21MCA003",
                "name": "Shruti Patel",
                "course": "mca",
                "gender": "female",
                "academicYear": 1
            }
        ]
    }
]

module.exports.gallery = [
    {
        "occasion": "Annual Tech Fest 2023",
        "images": [
            { "public_id": "techfest_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" },
            { "public_id": "techfest_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" },
            { "public_id": "techfest_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822510/samples/cloudinary-group.jpg" },
            { "public_id": "techfest_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/people/bicycle.jpg" },
            { "public_id": "techfest_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/animals/three-dogs.jpg" }
        ],
        "captions": "Highlights from the biggest tech fest of the year.",
        "date": "2024-03-15T00:00:00Z"
    },
    {
        "occasion": "Cultural Night 2023",
        "images": [
            { "public_id": "cultural_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822504/samples/bike.jpg" },
            { "public_id": "cultural_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822505/samples/people/jazz.jpg" },
            { "public_id": "cultural_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822511/samples/animals/kitten-playing.gif" },
            { "public_id": "cultural_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" },
            { "public_id": "cultural_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" }
        ],
        "captions": "A night full of music, dance, and cultural performances.",
        "date": "2024-04-05T00:00:00Z"
    },
    {
        "occasion": "Sports Meet 2023",
        "images": [
            { "public_id": "sports_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822510/samples/cloudinary-group.jpg" },
            { "public_id": "sports_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/people/bicycle.jpg" },
            { "public_id": "sports_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" },
            { "public_id": "sports_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822504/samples/bike.jpg" },
            { "public_id": "sports_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822505/samples/people/jazz.jpg" }
        ],
        "captions": "Celebrating sportsmanship and team spirit.",
        "date": "2024-02-20T00:00:00Z"
    },
    {
        "occasion": "Alumni Meet 2023",
        "images": [
            { "public_id": "alumni_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" },
            { "public_id": "alumni_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822511/samples/animals/kitten-playing.gif" },
            { "public_id": "alumni_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/animals/three-dogs.jpg" },
            { "public_id": "alumni_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822510/samples/cloudinary-group.jpg" },
            { "public_id": "alumni_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822504/samples/bike.jpg" }
        ],
        "captions": "A memorable gathering with our alumni.",
        "date": "2024-01-10T00:00:00Z"
    },
    {
        "occasion": "Tech Talk Series 2023",
        "images": [
            { "public_id": "techtalk_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822505/samples/people/jazz.jpg" },
            { "public_id": "techtalk_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822504/samples/bike.jpg" },
            { "public_id": "techtalk_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" },
            { "public_id": "techtalk_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822510/samples/cloudinary-group.jpg" },
            { "public_id": "techtalk_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" }
        ],
        "captions": "Engaging discussions on the latest tech trends.",
        "date": "2024-05-12T00:00:00Z"
    },
    {
        "occasion": "Annual Sports Day 2023",
        "images": [
            { "public_id": "sportsday_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" },
            { "public_id": "sportsday_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822505/samples/people/jazz.jpg" },
            { "public_id": "sportsday_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822511/samples/animals/kitten-playing.gif" },
            { "public_id": "sportsday_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822504/samples/bike.jpg" },
            { "public_id": "sportsday_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" }
        ],
        "captions": "A day full of exciting sports events.",
        "date": "2024-06-01T00:00:00Z"
    },
    {
        "occasion": "Graduation Ceremony 2023",
        "images": [
            { "public_id": "graduation_1", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/people/bicycle.jpg" },
            { "public_id": "graduation_2", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg" },
            { "public_id": "graduation_3", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822510/samples/cloudinary-group.jpg" },
            { "public_id": "graduation_4", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822506/samples/animals/three-dogs.jpg" },
            { "public_id": "graduation_5", "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg" }
        ],
        "captions": "Celebrating the achievements of our graduates.",
        "date": "2024-07-15T00:00:00Z"
    }
]

