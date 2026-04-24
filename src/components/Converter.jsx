import React, { useState } from 'react';
import { convertUnits } from '../services/api.js';

const Converter = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('g');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const units = ['kg', 'g', 'liter', 'ml'];

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!value) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await convertUnits({ 
        value: Number(value), 
        from: fromUnit, 
        to: toUnit 
      });
      setResult(response.data.result);
    } catch (err) {
      setError('Conversion failed.');
      // Mock conversion for development
      console.warn('Using mock conversion logic');
      mockConversion();
    } finally {
      setLoading(false);
    }
  };

  const mockConversion = () => {
    const val = Number(value);
    let res = 0;
    if (fromUnit === 'kg' && toUnit === 'g') res = val * 1000;
    else if (fromUnit === 'g' && toUnit === 'kg') res = val / 1000;
    else if (fromUnit === 'liter' && toUnit === 'ml') res = val * 1000;
    else if (fromUnit === 'ml' && toUnit === 'liter') res = val / 1000;
    else if (fromUnit === toUnit) res = val;
    else res = 'Incompatible units';
    
    setResult(res);
  };

  return (
    <div className="card">
      <h2>Unit Converter</h2>
      <form onSubmit={handleConvert}>
        <div className="form-group row">
          <div className="col flex-2">
            <label>Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              step="any"
              placeholder="0.0"
            />
          </div>
          <div className="col flex-1">
            <label>From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {units.map(u => <option key={`from-${u}`} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="col flex-1">
            <label>To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {units.map(u => <option key={`to-${u}`} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        
        {error && <div className="error-warning">{error} - Displaying mock result</div>}
        
        <button type="submit" disabled={loading} className="btn-secondary">
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {result !== null && (
        <div className="result-box">
          <span className="result-label">Result:</span>
          <span className="result-value">
            {typeof result === 'number' ? result.toFixed(3).replace(/\.?0+$/, '') : result} {toUnit}
          </span>
        </div>
      )}
    </div>
  );
};

export default Converter;
