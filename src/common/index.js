const apiUrl = "http://localhost:3010";

const Api = {
  login: {
    url: `${apiUrl}/api/login`,
    method: "post",
  },
  current_admin: {
    url: `${apiUrl}/api/currentadmin`,
    method: "get",
  },
  allUser: {
    url: `${apiUrl}/api/users`,
    method: "get",
  },
  logout_Admin: {
    url: `${apiUrl}/api/logout`,
    method: "get",
  },

  acceptUser: {
    url: `${apiUrl}/api/acceptUser`,
    method: "post",
  },

  //api materiel
  matiere: {
    url: `${apiUrl}/api/matiere`,
    method: "get",
  },

  updateMatiere: {
    url: `${apiUrl}/api/matiere`,
    method: "put",
  },
  deleteMateriel: {
    url: `${apiUrl}/api/matiere`,
    method: "delete",
  },
  AjouterMateriel: {
    url: `${apiUrl}/api/matiere`,
    method: "post",
  },

  //api components
  component: {
    url: `${apiUrl}/api/component`,
    method: "get",
  },

  deleteComponent: {
    url: `${apiUrl}/api/component`,
    method: "delete",
  },

  updateComponent: {
    url: `${apiUrl}/api/component`,
    method: "put",
  },

  ajouterComponent: {
    url: `${apiUrl}/api/component`,
    method: "post",
  },

  //api inforamtion
  information: {
    url: `${apiUrl}/api/information`,
    method: "get",
  },

  deleteInformation: {
    url: `${apiUrl}/api/information`,
    method: "delete",
  },

  ajouterInformation: {
    url: `${apiUrl}/api/information`,
    method: "post",
  },

  updateInformation: {
    url: `${apiUrl}/api/information`,
    method: "put",
  },

  //api Notification

  allNotification: {
    url: `${apiUrl}/api/notifications`,
    method: "get",
  },

  numberNotification: {
    url: `${apiUrl}/api/notifications-number`,
    method: "get",
  },

  allNotificationDemande: {
    url: `${apiUrl}/api/notificationsdemande`,
    method: "get",
  },

  numberNotificationDemande: {
    url: `${apiUrl}/api/notificationsdemandenumber`,
    method: "get",
  },

  allNotificationPaiement: {
    url: `${apiUrl}/api/notificationspaiement`,
    method: "get",
  },

  numberNotificationPaiement: {
    url: `${apiUrl}/api/notificationspaiementnumber`,
    method: "get",
  },

  updateNotification: {
    url: `${apiUrl}/api/notification`,
    method: "put",
  },

  //api demande

  getAllAnaylse: {
    url: `${apiUrl}/api/all-analyse`,
    method: "get",
  },

  detaillAllAnaylse: {
    url: `${apiUrl}/api/detaill-analyse`,
    method: "post",
  },

  acceptPaiement: {
    url: `${apiUrl}/api/accepte-paiement`,
    method: "put",
  },
  envoyerAnalyse: {
    url: `${apiUrl}/api/envoyer-analyse`,
    method: "put",
  },
};

export default Api;
