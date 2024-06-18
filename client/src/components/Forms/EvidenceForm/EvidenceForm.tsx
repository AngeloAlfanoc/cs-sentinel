import GenericField from '../../GenericField';

const EvidenceForm = () => {
  return (
    <div className='p-6 bg-gray-900 text-white shadow-md rounded-lg max-w-lg mx-auto'>
      <GenericField
        label='evidenceName'
        name='evidenceName'
        placeholder='placeholder_evidenceName'
      />

      <GenericField label='videoLink' name='videoLink' placeholder='placeholder_videoLink' />
      <GenericField label='type' name='type' placeholder='placeholder_type' />
      <GenericField
        label='description'
        name='description'
        as='textarea'
        placeholder='placeholder_description'
      />

      <GenericField
        label='steamLink'
        name='steamLink'
        type='url'
        placeholder='placeholder_steamLink'
        required
      />
    </div>
  );
};

export default EvidenceForm;
