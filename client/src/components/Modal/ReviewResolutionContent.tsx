import React from 'react';

const ReviewResolutionContent = () => {
  return (
    <div className='p-2 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto mt-10 h-96 overflow-y-auto'>
      <p className='mb-4'>
        Now that you've reviewed the evidence, it is your duty to determine the facts for each of
        the categories below. Note that for each category of disruption you should{' '}
        <span className='font-bold'>presume the suspect to be innocent</span>. Only if you are
        confident that you witnessed behavior that would be agreed upon by the CS:GO community to be
        disruptive, anti-competitive, and/or anti-social{' '}
        <span className='font-bold'>beyond a reasonable doubt</span> should you select{' '}
        <span className='font-bold'>Evident Beyond a Reasonable Doubt</span>. If you are not 100%
        confident in your decision, you should select{' '}
        <span className='font-bold'>Insufficient Evidence</span>.
      </p>
      <p className='mb-6'>
        If you don't feel that you were able to dedicate the appropriate attention level required to
        reach a verdict, please click on <span className='font-bold'>Postpone Judgement</span>. The
        case will remain available for you to review at a later time.
      </p>

      <div className='mb-6'>
        <h3 className='font-bold mb-2'>Major Disruption: Aim Assistance</h3>
        <p className='mb-2'>
          The evidence you reviewed would be judged, by any reasonable member of the CS:GO
          community, as clearly demonstrating that The Suspect{' '}
          <span className='font-bold'>used external software to improve their aim</span>, e.g.
          automated targeting, recoil reduction or elimination, etc.
        </p>
        <div className='flex'>
          <label className='flex items-center mr-6'>
            <input type='radio' name='aim-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Insufficient Evidence</span>
          </label>
          <label className='flex items-center'>
            <input type='radio' name='aim-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Evident Beyond a Reasonable Doubt</span>
          </label>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-2'>Major Disruption: Vision Assistance</h3>
        <p className='mb-2'>
          The evidence you reviewed would be judged, by any reasonable member of the CS:GO
          community, as clearly demonstrating that The Suspect{' '}
          <span className='font-bold'>
            used external software to gain information about locations of their opponents
          </span>
          , e.g. vision through walls or smoke, flashbang effect reduction or elimination, etc.
        </p>
        <div className='flex'>
          <label className='flex items-center mr-6'>
            <input type='radio' name='vision-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Insufficient Evidence</span>
          </label>
          <label className='flex items-center'>
            <input type='radio' name='vision-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Evident Beyond a Reasonable Doubt</span>
          </label>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-2'>Major Disruption: Other External Assistance</h3>
        <p className='mb-2'>
          The evidence you reviewed would be judged, by any reasonable member of the CS:GO
          community, as clearly demonstrating that The Suspect{' '}
          <span className='font-bold'>
            used external software other than those listed above to gain an advantage over their
            opponents
          </span>
          , e.g. speedhacking, automated jumping scripts, upside-down views, etc.
        </p>
        <div className='flex'>
          <label className='flex items-center mr-6'>
            <input type='radio' name='external-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Insufficient Evidence</span>
          </label>
          <label className='flex items-center'>
            <input type='radio' name='external-assistance' className='form-radio text-blue-500' />
            <span className='ml-2'>Evident Beyond a Reasonable Doubt</span>
          </label>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-2'>Minor Disruption: Griefing</h3>
        <p className='mb-2'>
          The evidence you reviewed would be judged, by any reasonable member of the CS:GO
          community, as clearly demonstrating that The Suspect{' '}
          <span className='font-bold'>
            exhibited behavior that was disruptive, anti-competitive, and/or anti-social
          </span>
          , e.g. deliberately interfering with or trying to damage or be damaged by teammates, or
          deliberately losing the match.
        </p>
        <div className='flex'>
          <label className='flex items-center mr-6'>
            <input type='radio' name='griefing' className='form-radio text-blue-500' />
            <span className='ml-2'>Insufficient Evidence</span>
          </label>
          <label className='flex items-center'>
            <input type='radio' name='griefing' className='form-radio text-blue-500' />
            <span className='ml-2'>Evident Beyond a Reasonable Doubt</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReviewResolutionContent;
