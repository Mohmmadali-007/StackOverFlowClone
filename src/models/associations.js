module.exports = () => {
  const oTo = (A, B) => {
    A.hasOne(B);
    B.belongsTo(A);
  };
  const oTm = (A, B) => {
    A.hasMany(B);
    B.belongsTo(A);
  };
  const oToFK = (A, B, FK) => {
    A.hasOne(B, { foreignKey: FK });
    B.belongsTo(A, { foreignKey: FK });
  };
  const oTmFK = (A, B, FK) => {
    A.hasMany(B, { foreignKey: FK });
    B.belongsTo(A, { foreignKey: FK });
  };
};
