/* ============================================================
   Data Service (Firebase Firestore SDK)
   ============================================================ */

class DataService {
  constructor() {
    this.db = window.db;
    this.offlineQueue = [];
    this.loadOfflineQueue();
  }

  // HALAQAT (حلقات)
  async addHalaqah(halaqahData) {
    try {
      const docRef = await this.db.collection('halaqat').add({
        name: halaqahData.name,
        category: halaqahData.category,
        instructor: halaqahData.instructor,
        ageGroup: halaqahData.ageGroup || 'all',
        schedule: halaqahData.schedule,
        studentsCount: halaqahData.studentsCount || 0,
        status: halaqahData.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...halaqahData };
    } catch (error) {
      console.error('Error adding halaqah:', error);
      this.addToOfflineQueue('add', 'halaqat', halaqahData);
      throw error;
    }
  }

  async getHalaqat() {
    try {
      const snapshot = await this.db.collection('halaqat').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching halaqat:', error);
      return [];
    }
  }

  async updateHalaqah(halaqahId, updates) {
    try {
      await this.db.collection('halaqat').doc(halaqahId).update({
        ...updates,
        updatedAt: new Date()
      });
      return { id: halaqahId, ...updates };
    } catch (error) {
      console.error('Error updating halaqah:', error);
      this.addToOfflineQueue('update', `halaqat/${halaqahId}`, updates);
      throw error;
    }
  }

  async deleteHalaqah(halaqahId) {
    try {
      await this.db.collection('halaqat').doc(halaqahId).delete();
    } catch (error) {
      console.error('Error deleting halaqah:', error);
      this.addToOfflineQueue('delete', `halaqat/${halaqahId}`, {});
      throw error;
    }
  }

  // PROGRAMS (البرامج)
  async addProgram(programData) {
    try {
      const docRef = await this.db.collection('programs').add({
        name: programData.name,
        category: programData.category,
        mosque: programData.mosque,
        sheikhName: programData.sheikhName,
        beneficiaries: programData.beneficiaries || 0,
        status: programData.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...programData };
    } catch (error) {
      console.error('Error adding program:', error);
      this.addToOfflineQueue('add', 'programs', programData);
      throw error;
    }
  }

  async getPrograms() {
    try {
      const snapshot = await this.db.collection('programs').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  async updateProgram(programId, updates) {
    try {
      await this.db.collection('programs').doc(programId).update({
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating program:', error);
      this.addToOfflineQueue('update', `programs/${programId}`, updates);
      throw error;
    }
  }

  async deleteProgram(programId) {
    try {
      await this.db.collection('programs').doc(programId).delete();
    } catch (error) {
      console.error('Error deleting program:', error);
      this.addToOfflineQueue('delete', `programs/${programId}`, {});
      throw error;
    }
  }

  // LESSONS (الدروس)
  async addLesson(lessonData) {
    try {
      const docRef = await this.db.collection('lessons').add({
        name: lessonData.name,
        instructor: lessonData.instructor,
        schedule: lessonData.schedule,
        type: lessonData.type,
        level: lessonData.level,
        attendees: lessonData.attendees || 0,
        status: lessonData.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...lessonData };
    } catch (error) {
      console.error('Error adding lesson:', error);
      this.addToOfflineQueue('add', 'lessons', lessonData);
      throw error;
    }
  }

  async getLessons(type = null) {
    try {
      let query = this.db.collection('lessons');
      if (type) {
        query = query.where('type', '==', type);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  }

  async updateLesson(lessonId, updates) {
    try {
      await this.db.collection('lessons').doc(lessonId).update({
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating lesson:', error);
      this.addToOfflineQueue('update', `lessons/${lessonId}`, updates);
      throw error;
    }
  }

  async deleteLesson(lessonId) {
    try {
      await this.db.collection('lessons').doc(lessonId).delete();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      this.addToOfflineQueue('delete', `lessons/${lessonId}`, {});
      throw error;
    }
  }

  // IMAMS (الأئمة)
  async addImam(imamData) {
    try {
      const docRef = await this.db.collection('imams').add({
        name: imamData.name,
        phone: imamData.phone,
        experience: imamData.experience,
        availability: imamData.availability,
        status: imamData.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...imamData };
    } catch (error) {
      console.error('Error adding imam:', error);
      this.addToOfflineQueue('add', 'imams', imamData);
      throw error;
    }
  }

  async getImams() {
    try {
      const snapshot = await this.db.collection('imams').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching imams:', error);
      return [];
    }
  }

  async updateImam(imamId, updates) {
    try {
      await this.db.collection('imams').doc(imamId).update({
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating imam:', error);
      this.addToOfflineQueue('update', `imams/${imamId}`, updates);
      throw error;
    }
  }

  async deleteImam(imamId) {
    try {
      await this.db.collection('imams').doc(imamId).delete();
    } catch (error) {
      console.error('Error deleting imam:', error);
      this.addToOfflineQueue('delete', `imams/${imamId}`, {});
      throw error;
    }
  }

  // GUESTS (الضيوف)
  async addGuest(guestData) {
    try {
      const docRef = await this.db.collection('guests').add({
        name: guestData.name,
        specialty: guestData.specialty,
        contact: guestData.contact,
        visitDate: guestData.visitDate,
        status: guestData.status || 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...guestData };
    } catch (error) {
      console.error('Error adding guest:', error);
      this.addToOfflineQueue('add', 'guests', guestData);
      throw error;
    }
  }

  async getGuests() {
    try {
      const snapshot = await this.db.collection('guests').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching guests:', error);
      return [];
    }
  }

  async updateGuest(guestId, updates) {
    try {
      await this.db.collection('guests').doc(guestId).update({
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating guest:', error);
      this.addToOfflineQueue('update', `guests/${guestId}`, updates);
      throw error;
    }
  }

  async deleteGuest(guestId) {
    try {
      await this.db.collection('guests').doc(guestId).delete();
    } catch (error) {
      console.error('Error deleting guest:', error);
      this.addToOfflineQueue('delete', `guests/${guestId}`, {});
      throw error;
    }
  }

  // OFFLINE QUEUE
  addToOfflineQueue(method, path, data) {
    const operation = {
      id: Date.now() + Math.random(),
      method,
      path,
      data,
      timestamp: new Date().toISOString()
    };
    this.offlineQueue.push(operation);
    this.saveOfflineQueue();
  }

  saveOfflineQueue() {
    localStorage.setItem('offlineQueue', JSON.stringify(this.offlineQueue));
  }

  loadOfflineQueue() {
    const queue = localStorage.getItem('offlineQueue');
    this.offlineQueue = queue ? JSON.parse(queue) : [];
  }

  async syncOfflineQueue() {
    if (this.offlineQueue.length === 0) return;

    for (const operation of this.offlineQueue) {
      try {
        // Sync logic would go here
        console.log('Syncing operation:', operation);
      } catch (error) {
        console.error('Failed to sync operation:', operation, error);
      }
    }
    this.offlineQueue = [];
    this.saveOfflineQueue();
  }
}

window.dataService = new DataService();
