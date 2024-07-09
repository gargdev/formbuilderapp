import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserForms } from '../features/forms/formSlice';
import { Link } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const { forms, loading, error } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(getUserForms());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="text-center mb-8">
        <Link to="/create-form" className="bg-green-500 px-4 py-2 text-white rounded">Create New Form</Link>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map((form) => (
            <div key={form._id} className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
              <Link to={`/fill-form/${form._id}`} className="bg-blue-600 px-4 py-2 text-white rounded">View Responses</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
