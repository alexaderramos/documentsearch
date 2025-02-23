class ResidentUI {
    static async loadResidents() {
        try {
            const response = await fetch('/api/residents');
            const residents = await response.json();
            const tbody = document.getElementById('residentsList');
            tbody.innerHTML = residents.map(resident => `
                <tr>
                    <td class="p-3">${resident.documentType} - ${resident.documentNumber}</td>
                    <td class="p-3">${resident.firstName}</td>
                    <td class="p-3">${resident.paternalLastName} ${resident.maternalLastName}</td>
                    <td class="p-3">${resident.buildingNumber}</td>
                    <td class="p-3">${resident.apartmentNumber}</td>
                    <td class="p-3">
                        <button onclick="ResidentUI.editResident('${resident._id}')" 
                                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                            Editar
                        </button>
                        <button onclick="ResidentUI.deleteResident('${resident._id}')"
                                class="bg-red-500 text-white px-2 py-1 rounded">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error cargando residentes:', error);
        }
    }

    static async createResident(formData) {
        try {
            await fetch('/api/residents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            await this.loadResidents();
        } catch (error) {
            console.error('Error creando residente:', error);
        }
    }

    // Implementar métodos para editar y eliminar
}

// Cargar residentes al iniciar
document.addEventListener('DOMContentLoaded', () => {
    ResidentUI.loadResidents();
}); 