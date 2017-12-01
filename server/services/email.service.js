const config = require('../config/config');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

class GestorEmail {
  static sendActivationLink(user) {
    var mailOptions = {
      from: 'Walnov, walnovweb@gmail.com',
      to: user.perfil.email,
      subject: 'Localhost Activation Link',
      text: 'Hello ' + user.perfil.display_name + ' Thank you for registering ' +
      'at localhost.com. Please click on the link bellow to complete your activation:' +
      'http://localhost:3000/activate/' + user.temporayToken,
      html: 'Hello<strong>' + user.perfil.display_name + '</strong>,<br><br>Thank you for registering ' +
      'at localhost.com. Please click on the link bellow to complete your activation:<br><br>' +
      '<a href="http://localhost:3000/home/activate/' + user.temporaryToken + '">Click Here</a>'
    };

    GestorEmail.sendMail(mailOptions);
  }

  static sendSuccessfullActivation(user) {
    var mailOptions = {
      from: 'Walnov, walnovweb@gmail.com',
      to: user.perfil.email,
      subject: 'Localhost Account Activated',
      text: 'Hello ' + user.perfil.display_name + ' Thank you for registering ' +
      'at localhost.com. Please click on the link bellow to complete your activation:' +
      'http://localhost:3000/activate/' + user.temporaryToken,
      html: 'Hello<strong>' + user.perfil.display_name + '</strong>,<br><br>Your account has been succesfully activated'
    };

    GestorEmail.sendMail(mailOptions);
  }

  static sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
module.exports.GestorEmail = GestorEmail;


