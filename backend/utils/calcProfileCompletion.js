module.exports = function calcProfileCompletion(entity) {
  if (!entity || typeof entity !== 'object') return 0;

  // Company profile completion
  if (entity.companyName !== undefined) {
    const fields = ['companyName', 'industry', 'size', 'location', 'about', 'website', 'logo'];
    const filled = fields.filter((f) => {
      const v = entity[f];
      if (!v) return false;
      if (Array.isArray(v)) return v.length > 0;
      return String(v).trim() !== '';
    });
    return Math.round((filled.length / fields.length) * 100);
  }

  // Freelancer profile completion
  const fields = ['fullName', 'bio', 'skills', 'portfolio', 'resume', 'profile_picture'];
  const filled = fields.filter((f) => {
    const v = entity[f];
    if (!v) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== '';
  });
  return Math.round((filled.length / fields.length) * 100);
};