// Portfolio content should be created and edited through the authenticated admin
// panel. This legacy seed command is intentionally disabled: older versions
// deleted live MongoDB collections before inserting placeholder content.
console.error('Seeding is disabled. Add verified portfolio content through /admin/dashboard.');
process.exitCode = 1;
