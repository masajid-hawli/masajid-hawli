/* ============================================================
   Authentication Service (Firebase SDK)
   ============================================================ */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.auth = window.auth;
    this.loadCurrentUser();
  }

  async signup(email, password, displayName) {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(email, password);
      
      if (displayName) {
        await result.user.updateProfile({ displayName });
      }

      this.currentUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName || result.user.email.split('@')[0]
      };

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return this.currentUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signin(email, password) {
    try {
      const result = await this.auth.signInWithEmailAndPassword(email, password);
      
      this.currentUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email.split('@')[0]
      };

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return this.currentUser;
    } catch (error) {
      console.error('Signin error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  loadCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getErrorMessage(code) {
    const errors = {
      'auth/user-not-found': 'لم يتم العثور على المستخدم',
      'auth/wrong-password': 'كلمة المرور غير صحيحة',
      'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
      'auth/weak-password': 'كلمة المرور ضعيفة جداً',
      'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
      'auth/user-disabled': 'الحساب معطل',
      'auth/too-many-requests': 'حاول مرة أخرى لاحقاً'
    };
    return errors[code] || 'حدث خطأ في المصادقة';
  }
}

window.authService = new AuthService();
