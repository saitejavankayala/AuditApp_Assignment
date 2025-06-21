# 🕵️ Audit App (React Native)

A role-based internal audit application built using **React Native**, supporting Admin, Auditor, and Viewer roles. Auditors can conduct audits via a multi-step form, while Admins can manage the audit history and Viewer can only see the created audit.

---

## 📱 Features

- 🔐 **Role-Based Login**: Choose between Admin, Auditor, or Viewer roles.
- 🧾 **Multi-Step Audit Form**: Submit ratings, select checkpoints, and add comments.
- 📝 **Audit History**:
  - Admins can delete any audit.
  - Auditors can edit and resubmit audits.
  - Viewers can only view audits.
- 🧠 **AsyncStorage** used for local audit persistence.
- 🔁 **BackHandler** support for controlled navigation.

---

## 👥 Roles and Permissions

| Role     | Can View | Can Edit | Can Delete |
|----------|----------|----------|------------|
| Admin    | ✅       | ❌       | ✅         |
| Auditor  | ✅       | ✅       | ❌         |
| Viewer   | ✅       | ❌       | ❌         |

---

## 🚀 Screens

- `LoginScreen`: Select role and login
- `AuditFormScreen`: Multi-step form for audit input
- `AuditSummaryScreen`: View audit summary before submission
- `AuditHistoryScreen`: View list of all submitted audits

---

## 📦 Tech Stack

- React Native 0.7x
- TypeScript
- AsyncStorage
- React Navigation
- Custom `useBackHandler` hook
- UUID for unique audit IDs

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/saitejavankayala/AuditApp_Assignment.git
cd auditApp

# Install dependencies
npm install

# iOS (if needed)
cd ios && pod install && cd ..
"# auditApp" 
