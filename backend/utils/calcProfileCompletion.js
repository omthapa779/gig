module.exports = function calcProfileCompletion(company) {
  const fields = ['companyName', 'industry', 'size', 'location', 'about', 'website', 'logo'];
  const filled = fields.filter(f => company[f]);
  const percent = Math.round((filled.length / fields.length) * 100);
  return percent;
};
