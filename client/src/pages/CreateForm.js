import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createForm } from '../features/forms/formSlice';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CreateForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      questions: [{ questionText: '', type: 'single', options: [''] }],
    },
  });
  const { fields, append, remove, move } = useFieldArray({ control, name: 'questions' });
  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({ control, name: 'questions[0].options' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.forms);

  const onSubmit = (data) => {
    dispatch(createForm(data)).then(() => {
      navigate('/dashboard');
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const handleAddQuestion = () => {
    append({ questionText: '', type: 'single', options: [''] });
  };

  const handleAddOption = (index) => {
    appendOption({ questionIndex: index, options: [] });
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Create Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1">Form Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 p-4 border border-gray-300 rounded"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <label className="block">Question {index + 1}</label>
                          <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                        </div>
                        <input
                          type="text"
                          {...register(`questions.${index}.questionText`, { required: 'Question text is required' })}
                          className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <div className="mb-2">
                          <label className="block">Question Type</label>
                          <select
                            {...register(`questions.${index}.type`)}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            <option value="single">Single Choice</option>
                            <option value="multiple">Multiple Choice</option>
                          </select>
                        </div>
                        <div>
                          {/* {field.type === 'multiple' ? ( */}
                            <>
                              {field.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center mb-2">
                                  <input
                                    type="text"
                                    {...register(`questions.${index}.options.${optIndex}`, { required: 'Option is required' })}
                                    className="w-full p-2 border border-gray-300 rounded mr-2"
                                  />
                                  <button type="button" onClick={() => removeOption(index, optIndex)} className="text-red-500">Remove</button>
                                </div>
                              ))}
                              <button type="button" onClick={() => handleAddOption()} className="bg-green-500 px-4 py-2 text-white rounded">Add Option</button>
                            </>
                          {/* ) : ( */}
                            {/* <div className="flex items-center mb-2">
                              <input
                                type="text"
                                {...register(`questions.${index}.options.0`, { required: 'Option is required' })}
                                className="w-full p-2 border border-gray-300 rounded mr-2"
                              />
                            </div> */}
                          {/* )} */}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full p-2 bg-green-500 text-white rounded mt-4 mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          Create Form
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
      </form>
    </div>
  );
}

export default CreateForm;

