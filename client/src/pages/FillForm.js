import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../features/forms/formSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FillForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, loading, error } = useSelector((state) => state.forms);
  const { register, control, handleSubmit } = useForm();
  const { fields } = useFieldArray({ control, name: 'responses' });

  useEffect(() => {
    dispatch(getForm(id));
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/responses', { formId: id, responses: data.responses });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{form?.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
        {form?.questions.map((question, index) => (
          <div key={question._id} className="mb-4">
            <label className="block mb-1">{question.questionText}</label>
            {question.type === 'single' ? (
              <input
                type="text"
                {...register(`responses.${index}`, { required: 'Response is required' })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    {...register(`responses.${index}.options.${optIndex}`)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </div>
              ))
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          Submit
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default FillForm;
