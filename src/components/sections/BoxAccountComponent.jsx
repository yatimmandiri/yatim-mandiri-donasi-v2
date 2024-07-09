'use client';

import { FormProfileComponent } from '@/components/forms/FormProfileComponent';
import { ButtonComponent } from '@/components/partials/ButtonComponent';
import {
  AlertComponent,
  ModalComponent,
} from '@/components/partials/DialogComponent';
import { UseAuth } from '@/hooks/useAuth';
import {
  ChevronRightIcon,
  PencilIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { createElement, useState } from 'react';
import { FaInfoCircle, FaWhatsapp } from 'react-icons/fa';
import {
  MdLogout,
  MdOutlinePrivacyTip,
  MdOutlineReceiptLong,
} from 'react-icons/md';

export const BoxAccountComponent = () => {
  const [showProfile, setShowProfile] = useState(false);

  const { session } = UseAuth();
  const params = new URLSearchParams({
    name: session ? session.name : 'Account',
  });

  return (
    <section className='flex w-full pt-4 justify-center items-center space-x-4 p-4'>
      <Image
        src={`https://ui-avatars.com/api/?${params}`}
        alt='avatar'
        width={512}
        height={512}
        className='w-24 h-24 rounded-full'
        priority={true}
      />
      <div className='flex flex-col flex-1 justify-center space-y-1.5'>
        <div className='flex items-center space-x-2'>
          <span className='font-bold'>{session?.name}</span>
          <StarIcon className='w-4 h-4 text-baseColor-400' />
        </div>
        <span>{session?.email}</span>
        <span>{session?.handphone}</span>
        <button
          onClick={() => setShowProfile(true)}
          className='inline-flex space-x-1.5 border-baseColor-500 border w-fit p-1.5 rounded-lg text-baseColor-500'
        >
          <PencilIcon className='w-4 h-4' />
          <span>Edit</span>
        </button>
      </div>

      {/* Modal Profile */}
      <ModalComponent
        isOpen={showProfile}
        withHeader={true}
        modalTitle='Update Profile'
        handleOnChange={() => setShowProfile(false)}
      >
        <section className='flex flex-col p-4'>
          <FormProfileComponent setShowProfile={setShowProfile} />
        </section>
      </ModalComponent>
    </section>
  );
};

export const BadgeAccountComponent = () => {
  return (
    <section className='flex flex-row items-center space-x-4 justify-between border-y p-4'>
      <span className='p-1 bg-baseColor-300 border-gray-300 text-white rounded-full border'>
        <Image
          src={'/assets/images/YM ILUSTRASI 10.png'}
          alt='img'
          width={512}
          height={512}
          className='w-7 h-7'
          priority={true}
        />
      </span>
      <div className='flex flex-col space-y-1'>
        <span className='font-semibold'>Rp 0</span>
        <span>Terkumpul</span>
      </div>
      <div className='flex flex-col space-y-1'>
        <span className='font-semibold'>0</span>
        <span>Dibagikan</span>
      </div>
      <div className='flex flex-col space-y-1'>
        <span className='font-semibold'>0</span>
        <span>Berdonasi</span>
      </div>
      <ButtonComponent text='Rincian' variant='outline' />
    </section>
  );
};

export const MenuAccountComponent = () => {
  const [showSyarat, setShowSyarat] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivasi, setShowPrivasi] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { logout: submitLogout } = UseAuth();

  const menus = [
    {
      name: 'Syarat dan Ketentuan',
      icons: MdOutlineReceiptLong,
      handler: () => setShowSyarat(true),
    },
    {
      name: 'Kebijakan Privasi',
      icons: MdOutlinePrivacyTip,
      handler: () => setShowPrivasi(true),
    },
    {
      name: 'FAQ',
      icons: FaInfoCircle,
      handler: () => setShowFAQ(true),
    },
    {
      name: 'Pusat Bantuan',
      icons: FaWhatsapp,
      handler: () =>
        window.open(
          'https://wa.me/628111343577?text=Saya Ingin Bertanya?',
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      name: 'Keluar',
      icons: MdLogout,
      handler: () => setShowLogout(true),
    },
  ];

  return (
    <section className='flex flex-col space-y-4 px-4'>
      <legend className='text-sm font-semibold'>Info</legend>
      <ul className='flex flex-col space-y-2'>
        {menus.map((item, i) => (
          <li
            key={i}
            onClick={item.handler}
            className='flex items-center justify-between space-x-4 p-3 rounded border cursor-pointer hover:bg-gray-200'
          >
            <div className='flex items-center space-x-2'>
              {createElement(item.icons, { className: 'w-5 h-5' })}
              <span>{item.name}</span>
            </div>
            <ChevronRightIcon className='w-5 h-5' />
          </li>
        ))}
      </ul>

      {/* Logout Confirmation */}
      <AlertComponent
        isOpen={showLogout}
        withHeader={true}
        modalTitle='Logout Confirmation'
        handleOnChange={() => setShowLogout(false)}
      >
        <section className='flex flex-col space-y-2'>
          <p className='p-2'>Apakah Anda Ingin Keluar ?</p>
          <div className='flex-1 text-right justify-end items-end'>
            <ButtonComponent
              onClick={() => submitLogout() && setShowLogout(false)}
              text='Keluar'
            />
          </div>
        </section>
      </AlertComponent>

      {/* Syarat dan ketentuan */}
      <ModalComponent
        isOpen={showSyarat}
        withHeader={true}
        modalTitle='Syarat dan Ketentuan'
        handleOnChange={() => setShowSyarat(false)}
      >
        <section className='flex flex-col space-y-2 text-justify p-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
        </section>
      </ModalComponent>

      {/* Kebijakan Privasi */}
      <ModalComponent
        isOpen={showPrivasi}
        withHeader={true}
        modalTitle='Kebijakan Privasi'
        handleOnChange={() => setShowPrivasi(false)}
      >
        <section className='flex flex-col space-y-2 text-justify p-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
        </section>
      </ModalComponent>

      {/* FAQ */}
      <ModalComponent
        isOpen={showFAQ}
        withHeader={true}
        modalTitle='FAQ'
        handleOnChange={() => setShowFAQ(false)}
      >
        <section className='flex flex-col space-y-2 text-justify p-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            distinctio tempora. Soluta accusantium ducimus maiores hic voluptate
            laborum officiis, ea exercitationem vitae? Eius quis delectus
            dolorem eaque necessitatibus quo veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Laudantium autem quidem earum at
            deserunt voluptatum porro reiciendis exercitationem, itaque ratione
            nemo iure sed? Fugiat delectus incidunt dolorum, doloribus quis
            harum?
          </p>
        </section>
      </ModalComponent>
    </section>
  );
};
