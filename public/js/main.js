class ResidentUI {
    static currentId = null;

    static async loadResidents() {
        try {
            const response = await fetch('/api/residents');
            const residents = await response.json();
            const tbody = document.getElementById('residentsList');
            
            tbody.innerHTML = residents.map(resident => `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        ${resident.documentType.toUpperCase()} - ${resident.documentNumber}
                    </td>
                    <td class="px-6 py-4">
                        ${resident.firstName} ${resident.paternalLastName} ${resident.maternalLastName}
                    </td>
                    <td class="px-6 py-4">
                        Edificio ${resident.buildingNumber} - Dpto ${resident.apartmentNumber}
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm">
                            ${resident.isOwner ? '<span class="text-green-600">Propietario</span>' : ''}
                            ${resident.isTenant ? '<span class="text-blue-600">Inquilino</span>' : ''}
                            ${resident.hasDebt ? '<span class="text-red-600">Con Deuda</span>' : ''}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="ResidentUI.editResident('${resident.id}')" 
                                class="text-yellow-600 hover:text-yellow-900 mr-3">
                            Editar
                        </button>
                        <button onclick="ResidentUI.deleteResident('${resident.id}')"
                                class="text-red-600 hover:text-red-900">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error cargando residentes:', error);
            alert('Error al cargar los residentes');
        }
    }

    static async createOrUpdateResident(event) {
        event.preventDefault();
        
        const formData = {
            documentType: document.getElementById('documentType').value,
            documentNumber: document.getElementById('documentNumber').value,
            firstName: document.getElementById('firstName').value,
            paternalLastName: document.getElementById('paternalLastName').value,
            maternalLastName: document.getElementById('maternalLastName').value,
            buildingNumber: parseInt(document.getElementById('buildingNumber').value),
            apartmentNumber: parseInt(document.getElementById('apartmentNumber').value),
            isOwner: document.getElementById('isOwner').checked,
            isTenant: document.getElementById('isTenant').checked,
            hasDebt: document.getElementById('hasDebt').checked
        };

        try {
            const url = this.currentId 
                ? `/api/residents/${this.currentId}`
                : '/api/residents';
            
            const method = this.currentId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error en la operación. ' );
            }

            console.log(this.currentId);

            const message = this.currentId !=null ? 'Residente actualizado exitosamente' : 'Residente creado exitosamente'; 
            await this.loadResidents();
            this.clearForm();
            alert(message);
        } catch (error) {
            console.log(error)
            alert('Error al guardar el residente. ' + error.message);
        }
    }

    static setFormMode(mode = 'create') {
        const formTitle = document.getElementById('formTitle');
        const submitButton = document.getElementById('submitButton');
        
        if (mode === 'edit') {
            formTitle.textContent = 'Editar Residente';
            submitButton.textContent = 'Actualizar';
            submitButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            submitButton.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        } else {
            formTitle.textContent = 'Nuevo Residente';
            submitButton.textContent = 'Guardar';
            submitButton.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
            submitButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
        }
    }

    static async editResident(id) {
        try {
            const response = await fetch(`/api/residents/${id}`);
            const resident = await response.json();
            
            this.currentId = id;
            document.getElementById('documentType').value = resident.documentType;
            document.getElementById('documentNumber').value = resident.documentNumber;
            document.getElementById('firstName').value = resident.firstName;
            document.getElementById('paternalLastName').value = resident.paternalLastName;
            document.getElementById('maternalLastName').value = resident.maternalLastName;
            document.getElementById('buildingNumber').value = resident.buildingNumber;
            document.getElementById('apartmentNumber').value = resident.apartmentNumber;
            document.getElementById('isOwner').checked = resident.isOwner;
            document.getElementById('isTenant').checked = resident.isTenant;
            document.getElementById('hasDebt').checked = resident.hasDebt;

            // Cambiar modo del formulario a edición
            this.setFormMode('edit');
            
            // Hacer scroll al formulario
            document.getElementById('residentForm').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error cargando residente:', error);
            alert('Error al cargar los datos del residente');
        }
    }

    static async deleteResident(id) {
        if (!confirm('¿Está seguro de que desea eliminar este residente?')) {
            return;
        }

        try {
            const response = await fetch(`/api/residents/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar');
            }

            await this.loadResidents();
            alert('Residente eliminado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el residente');
        }
    }

    static clearForm() {
        this.currentId = null;
        document.getElementById('residentForm').reset();
        this.setFormMode('create');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    ResidentUI.loadResidents();
    document.getElementById('residentForm').addEventListener('submit', (e) => ResidentUI.createOrUpdateResident(e));
}); 