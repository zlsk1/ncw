export const progressProps = {
  percentage: { type: [Number, String], default: 50, required: true },
  section: { type: Number, default: 0 },
  width: { type: String, default: '200px' },
  height: { type: String, default: '10px' },
  color: { type: String, default: '#409eff' }
}