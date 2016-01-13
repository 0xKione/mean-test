angular.module('meanApp').service('EmailService', function() {
    var INBOX = 0;
    var TRASH = 1;
    var emails = [
        { id: 0, sender: "rich@domain.com", title: "emailTitle1", body: "This is the email body.", category: INBOX },
        { id: 1, sender: "email@domain.com", title: "emailTitle2", body: "This is the second email body.", category: INBOX },
        { id: 2, sender: "admin@domain.com", title: "emailTitle3", body: "This is the third email body.", category: INBOX },
        { id: 3, sender: "trash@domain.com", title: "trashTitle", body: "This email was thrown away.", category: TRASH }
    ];

    this.getEmails = function() {
        return emails;
    }

    this.getInbox = function() {
        return _.filter(emails, function(email) {
            return email.category == INBOX;
        });
    }

    this.getTrash = function() {
        return _.filter(emails, function(email) {
            return email.category == TRASH;
        });
    }

    this.getEmail = function(id) {
        return _.find(emails, function(email) {
            return email.id == id;
        });
    }

    this.addEmail = function(sender, title, body) {
        emails.push({ id: emails.length, sender: sender, title: title, body: body, category: INBOX });
    }

    this.trashEmail = function(id) {
        var email = this.getEmail(id);
        email.category = TRASH;
    }

    this.deleteEmail = function(id) {
        var email = this.getEmail(id);
        var index = emails.indexOf(email);
        if (index != -1)
            emails.splice(index, 1);
        else
            console.log("Unable to find email with id:" + id);
    }
});
