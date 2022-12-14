import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      brand: 'Zenoubia',

      // login
      loginEmail: `Adresse e-mail`,
      loginPassword: `le mot de passe`,
      loginBtn: 'connexion',
      rememberMe: 'Souviens-toi de moi?',
      authError:
        "Vérifiez vos informations d'identification, réessayez plus tard",

      // profile
      userName: 'Nom',
      password: 'Mot de passe',
      newPassword: 'nouveau mot de passe',
      phone: 'Phone',
      userNamePlaceholder: 'Entrez le nom ici ...',
      passwordPlaceholder: 'Entrez le mot de passe ici',
      phonePlaceholder: 'Entrez le numéro de téléphone ici',

      // sidebar data
      profile: 'Profile',
      categories: 'Catégories',
      products: 'Produits',
      orders: 'Ordres',
      sizes: 'Tailles',
      colors: 'Couleurs',
      city: 'Villes',
      country: 'Pays',
      government: 'États',
      contact: 'Contact ',
      reports: 'Rapports',
      logout: 'se déconnecter',

      // table
      englishName: 'Nom Français',
      arabicName: 'Nom Arabe',
      photo: 'Photo',
      actions: 'Actions',
      countryArabic: 'Pays en Arabe',
      countryEnglish: 'Pays en Français',
      governmentArabic: 'State en Arabe',
      governmentEnglish: 'State en Français',
      email: 'E-mail',
      subject: 'Matière',
      message: 'Message',

      // pages
      color: 'Couleur',
      size: 'Taille',

      // input placeholders
      enterName: 'Entrez le nom',
      colorPlaceholder: 'Choisissez la couleur',
      colorDegree: 'Nuance de Couleur',
      chooseColor: 'Choisissez la couleur',
      chooseSize: 'Choisissez la taille',
      selectSize: 'Choisissez la taille',
      chooseGovernment: 'Choisissez la État',
      chooseCountry: 'Choisissez la Pay',
      chooseCategory: 'Choisissez la Catégory',
      btnUpdate: 'Mise à jour',
      btnUpload: 'Ajouter',
      btnCancel: 'Annuler',

      // placeholders
      addCity: '',
      addCountry: '',
      addGovernment: '',
      addProduct: '',
      addCategory: '',

      // reports
      income: 'Revenu',
      bestCustomer: 'Meilleur client',
      bestProducts: 'Produit le plus vendu',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      expenses: 'Dépenses',
      currency: 'DA',

      // orders
      pending: 'En attente',
      shipped: 'Expédition',
      rejected: 'Rejeté',
      completed: 'Complété',
      clientInformation: 'informations le client',
      shippingAddress: 'Adresse de livraison',
      productName: 'Nom du Produit',
      piecePrice: 'Prix ​​unitaire',
      quantity: 'Quantité',
      total: 'Total ',
      status: 'Statut ',

      // products

      category: 'Catégorie',
      price: 'Prix',
      stock: 'Stock',
      outStock: 'En rupture de stock',
      arabicDescription: 'Descriptif Français',
      englishDescription: 'Description Arabe',

      //
      yes: 'Oui',
      no: 'Non',
      save: 'sauver',
    },
  },
  ar: {
    translation: {
      // login
      loginBtn: 'تسجيل الدخول',
      loginEmail: `البريد الإلكتروني`,
      loginPassword: `الرقم السري`,
      rememberMe: 'تذكرني',
      authError: 'تحقق من بيانات الدخول و حاول مجددا لاحقا',
      
      // profile
      userName: 'الاسم',
      phone: 'الهاتف',
      password: 'كلمة السر',
      newPassword: 'كلمة السر الجديدة',
      userNamePlaceholder: 'ادخل الاسم  ...',
      passwordPlaceholder: 'ادخل الرقم السري  ...',
      phonePlaceholder: 'ادخل رقم الهاتف ...',

      // sidebar data
      profile: 'حسابي',
      // profile: 'الحساب الشخصي',
      categories: 'الفئات',
      products: 'المنتجات',
      orders: 'الطلبات',
      sizes: 'المقاسات',
      colors: 'الألوان',
      city: 'المدن',
      country: 'الدول',
      government: 'الولايات',
      contact: 'اتصل بنا ',
      reports: 'التقارير',
      logout: 'تسجيل الخروج',

      // table
      englishName: 'الإسم الفرنسي',
      arabicName: 'الإسم العربي',
      photo: 'الصورة ',
      actions: 'العمليات',
      countryArabic: 'الدولة بالعربية',
      countryEnglish: 'الدولة بالفرنسية',
      governmentArabic: 'الولاية بالعربية',
      governmentEnglish: 'الولاية بالفرنسية',
      email: 'البريد الالكتروني',
      subject: 'العنوان',
      message: 'الرسالة',

      // pages
      color: 'اللون',
      size: 'المقاس',

      // input placeholders
      enterName: 'ادخل الاسم',
      colorPlaceholder: 'اختر اللون',
      colorDegree: 'درجة اللون',
      chooseColor: 'اختر اللون',
      chooseSize: 'اختر المقاس',
      selectSize: 'اختر المقاس',
      chooseGovernment: 'اختر الولاية',
      chooseCountry: 'اختر الدولة',
      chooseCategory: 'اختر الفئة',
      btnUpdate: 'تحديث',
      btnUpload: 'اضافة',
      btnCancel: 'الغاء',
      // reports
      income: 'الدخل',
      bestCustomer: 'أفضل عميل',
      bestProducts: 'الأكثر مبيعا',
      startDate: 'تاريخ البداية',
      endDate: ' تاريخ النهاية',
      expenses: 'النفقات',
      currency: 'د.ج',

      // orders
      pending: 'تحت المراجعة',
      shipped: 'تم الشحن',
      rejected: 'مرفوض',
      completed: 'منتهي',
      clientInformation: 'بيانات العميل',
      shippingAddress: 'عنوان الشحن',
      productName: 'المنتج المطلوب',
      piecePrice: 'سعر الوحدة',
      quantity: 'الكمية',
      total: 'المجموع ',
      status: 'الحالة ',

      // products

      category: 'الفئة',
      price: 'الأسعار',
      stock: 'المخزون',
      outStock: 'المخزون فارغ',
      arabicDescription: 'الوصف الفرنسي',
      englishDescription: 'الوصف العربي',

      yes: 'نعم',
      no: 'لا',
      save: 'حفظ',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
