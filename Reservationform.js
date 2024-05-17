
// Calendar Configuration
const calendar = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
calendar.setAttribute('min', today);

// Form Submission Handling
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

});


function reservationData() {
    let Name = document.getElementById('name').value;
    let Email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let appointment_date = document.getElementById('appointment_date').value;
    let Message = document.getElementById('message').value;

    const Data = {
        N: Name,
        E: Email,
        p: phone,
        D: appointment_date,
        T: appointment_date,
        M: Message,

    }

    fetch('http://localhost/reservation', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({ Data }), // Convert the object to a JSON string
    })
        .then(function (response) {
            if (!response.ok) {
                console.log('Network response was not ok');
            }
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });

}



var teamMembers = [
    {
        name: "Dr Ahmed",
        image: "doctor ahmed.jpg",
        bio: "drahmed@gmail.com"
    },
    {
        name: "Dr emily",
        image: "dr emily.jpg",
        bio: "dremily@gmail.com"
    },
    {
        name: "Dr hatem",
        image: "dr hatem.jpg",
        bio: "drhatem@gmail.com"
    },
    {
        name: "Dr sarah",
        image: "dr sarah.jpg",
        bio: "drsarah@gmail.com"
    },

];


function displayTeamMembers() {
    var teamContainerElement = document.getElementById("team-container");

    teamMembers.forEach(function (member) {
        var profileCardElement = document.createElement("div");
        profileCardElement.className = "profile-card";

        var imageElement = document.createElement("img");
        imageElement.src = member.image;
        imageElement.alt = "Profile Picture";

        var nameElement = document.createElement("h2");
        nameElement.textContent = member.name;

        var bioElement = document.createElement("p");
        bioElement.textContent = member.bio;

        profileCardElement.appendChild(imageElement);
        profileCardElement.appendChild(nameElement);
        profileCardElement.appendChild(bioElement);

        teamContainerElement.appendChild(profileCardElement);
    });
}

displayTeamMembers();