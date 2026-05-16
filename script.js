// Fonction pour récupérer les voitures depuis le serveur Node.js (MySQL)
async function fetchCars() {
    try {
        const response = await fetch('http://localhost:5000/cars');
        const data = await response.json();
        const container = document.getElementById('fleetContainer');
        
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = "<p class='text-center text-gray-500 col-span-3'>Aucune voiture n'est disponible pour le moment.</p>";
            return;
        }

        // Génération dynamique des cartes de voitures
        container.innerHTML = data.map(car => `
            <div class="car-card bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100" data-aos="fade-up">
                <div class="flex justify-between mb-4">
                    <span class="${car.disponible ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        ${car.disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                    <div class="text-right">
                        <p class="text-2xl font-black text-red-600">${car.prix} DA</p>
                        <p class="text-gray-400 text-xs font-bold">PAR JOUR</p>
                    </div>
                </div>
                <img src="${car.image_url}" alt="${car.nom}" class="w-full h-56 object-contain mb-8 hover:scale-105 transition duration-500">
                <h3 class="text-2xl font-bold mb-3">${car.nom}</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">${car.description}</p>
                <div class="flex border-t pt-6 border-gray-200 justify-between text-gray-400 text-xs font-bold">
                    <span><i class="fas fa-gas-pump mr-2"></i> ${car.carburant || 'Essence'}</span>
                    <span><i class="fas fa-cog mr-2"></i> Auto</span>
                </div>
            </div>
        `).join('');

        // Très important : Rafraîchir AOS pour animer les nouvelles cartes injectées
        AOS.refresh();

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Lancer AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // Charger les voitures
    fetchCars();

    // Animation de la barre de navigation au scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'py-3');
        } else {
            nav.classList.remove('shadow-lg', 'py-3');
        }
    });
});