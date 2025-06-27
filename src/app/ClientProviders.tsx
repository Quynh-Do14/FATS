"use client"
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

type RecoilProviderProps = {
    children: ReactNode;
};

const RecoilProvider = ({ children }: RecoilProviderProps) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;