import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { Image } from '@rneui/themed';
import Colors from '@/constants/Colors';
import { CounterStackScreenProps } from '@/interfaces/navigation/counter';
import { useAppSelector } from '@/hooks/redux';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { thousandSeperators } from '@/utils/thousandSeperators';

const SaleSuccessScreen = ({
  navigation,
}: Omit<CounterStackScreenProps<'SaleSuccess'>, 'route'>) => {
  const handleCounterPageRedirect = () => {
    navigation.navigate('Counter');
  };

  const { selectedSales } = useAppSelector((state) => state.newSale);
  const { saleSummary } = useAppSelector((state) => state.saleSummary);

  const totalQuantities = selectedSales.reduce(
    (acc, item) => acc + item.changeQuantity,
    0
  );

  const totalItemsBought = selectedSales.length;

  const changeOrShortSpan = () => {
    let span = '';
    if (saleSummary.cashReceived !== 0 && saleSummary.change > 0) {
      span = `
      <span class="font-semibold">Change</span>
      <span class=" font-semibold text-emerald-500">₦${thousandSeperators(
        saleSummary.change
      )}</span>
      `;
    } else if (saleSummary.cashReceived !== 0 && saleSummary.short > 0) {
      span = `
      <span class="font-semibold col-span-3">Short by</span>
      <span class="font-semibold text-red-500">₦${thousandSeperators(
        saleSummary.short
      )}</span>
      `;
    } else {
      span = `
      <span class="font-semibold col-span-3">Change</span>
      <span class="font-semibold">₦0</span>
      `;
    }
    return span;
  };

  const createNoteSpan = () => {
    let span = '';
    if (saleSummary.note !== '') {
      span = `
      <span class="text-xs">Note: ${saleSummary.note}</span>
      `;
    }
    return span;
  };

  const createDynamicSpan = () => {
    let span = '';
    for (let step = 0; step < selectedSales.length; step++) {
      span += `
      <span>${selectedSales[step].name}</span>
      <span>₦${thousandSeperators(selectedSales[step].sellingPrice)}</span>
      <span>${thousandSeperators(selectedSales[step].changeQuantity)}</span>
      <span>₦${thousandSeperators(selectedSales[step].total)}</span>
      `;
    }
    return span;
  };

  // const html = `
  // <!DOCTYPE html>
  // <html lang="en">

  // <head>
  //   <meta charset="UTF-8">
  //   <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <script src="https://cdn.tailwindcss.com"></script>
  //   <title>Eazy Retail Slaes Receipt</title>
  // </head>

  // <body>
  //   <main class='mx-6 my-4 '>
  //     <div class="">

  //       <div class="flex justify-center">
  //         <div class="flex flex-col">
  //           <span class="font-bold text-3xl text-center text-emerald-500">Smith Store</span>
  //           <span class="text-sm text-center">123 Billings Way</span>
  //           <span class="text-sm text-center">Lagos, NG 100234</span>
  //           <span class="text-xs text-center">Tel: +234 123 456 7890</span>
  //         </div>
  //       </div>
  //       <div class='border  w-full my-4'></div>

  //       <div class="flex flex-col items-center">
  //         <span class="font-bold">${saleSummary.customerName}</span>
  //         <span class="text-xs">${saleSummary.customerPhone}</span>
  //       </div>
  //       <div class='border  w-full my-4'></div>

  //       <div class="flex flex-col items-center">
  //         <span class="font-bold">Order Summary</span>
  //         <span class="text-xs">Receipt ID: ${saleSummary.receiptID}</span>
  //         <span class="text-xs">Created: 15 Feb 2023 - 8:50pm</span>
  //       </div>

  //       <table class='max-w-lg mx-auto w-full table-auto mt-8'>
  //         <thead class='px-1 py-2 bg-gray-200'>
  //           <tr class='flex'>
  //             <th class='flex w-full'>
  //               Pmode
  //             </th>
  //             <th class='flex w-full '>
  //               Items
  //             </th>
  //             <th class='flex w-full'>
  //               Qty
  //             </th>
  //             <th class='flex w-full'>
  //               Amount
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr class='flex justify-between'>
  //             <td class='w-full'>
  //               ${saleSummary.paymentMethod}
  //             </td>
  //             <td class='w-full'>
  //               ${totalItemsBought}
  //             </td>
  //             <td class='w-full'>
  //               ${totalQuantities}
  //             </td>
  //             <td class='w-full'>
  //             ₦${saleSummary.total}
  //             </td>
  //           </tr>

  //         </tbody>
  //       </table>
  //       <div class='border  w-full my-4'></div>

  //       <div class="grid grid-cols-4 max-w-lg mx-auto bg-gray-200 px-2 ">
  //         <span class='font-bold text-lg'>Name</span>
  //         <span class='font-bold text-lg'>Price</span>
  //         <span class='font-bold text-lg'>Qty</span>
  //         <span class='font-bold text-lg'>Total</span>
  //       </div>

  //       <div class="grid grid-cols-4 max-w-lg mx-auto px-2 space-y-2 text-sm">
  //         ${createDynamicSpan()}
  //         <span>Maggi naija pot</span>
  //         <span>₦500</span>
  //         <span>2</span>
  //         <span>₦1,000</span>

  //         <span>Dangote Rice</span>
  //         <span>₦35,000</span>
  //         <span>4</span>
  //         <span>₦140,000</span>

  //         <span>Golden Penny SPaggethi</span>
  //         <span>₦1,500</span>
  //         <span>1</span>
  //         <span>₦1,500</span>

  //         <span>Indomie Onion Flavour</span>
  //         <span>₦3,500</span>
  //         <span>3</span>
  //         <span>₦10,500</span>

  //       </div>

  //       <div class='border-b-2 border-black my-2'></div>

  //       <div class="grid grid-cols-4 max-w-lg mx-auto px-2 text-sm">

  //         <span class='col-span-3'>Sub total</span>
  //         <span>₦${saleSummary.subtotal}</span>

  //         <span class='col-span-3'>Tax</span>
  //         <span>
  //         ₦${saleSummary.tax}
  //         </span>

  //         <span class='col-span-3'>Discount</span>
  //         <span>
  //         ₦${saleSummary.discount}
  //         </span>

  //         <span class='col-span-3 font-bold text-base'>Grand Total</span>
  //         <span class='font-bold text-base'>
  //         ₦${saleSummary.total}
  //         </span>
  //       </div>
  //       <div class='border-b-2 border-gray-200 my-2'></div>

  //       <div class="grid grid-cols-4 max-w-lg mx-auto px-2 text-sm">

  //         <span class='col-span-3 text-emerald-500'>Payment Recieved</span>
  //         <span>₦${saleSummary.cashReceived}</span>

  //         ${changeOrShortSpan()}
  //       </div>
  //       <div class='border-b-2 border-gray-200 my-2'></div>

  //       <div class="mt-5">
  //         <p class='text-center'>
  //           Thank you for shopping with us. We hope to see you again soon.
  //         </p>
  //         <p class='text-center text-sm'>
  //           Created from Eazy Retail app
  //         </p>
  //         <p class='text-center text-sm'>
  //           by Ibukun Demehin
  //         </p>

  //       </div>
  //     </div>
  //   </main>
  // </body>

  // </html>
  // `;

  const htmlReceipt = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <script src="https://cdn.tailwindcss.com"></script> -->
  <!-- <link href="/dist/output.css" rel="stylesheet"> -->
  <style>
  @page {
    break-inside: auto;
  }
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: #e5e7eb;
    }

    ::before,
    ::after {
      --tw-content: '';
    }

    html {
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-feature-settings: normal;
    }

    body {
      margin: 0;
      line-height: inherit;
    }

    hr {
      height: 0;
      color: inherit;
      border-top-width: 1px;
    }

    abbr:where([title]) {
      -webkit-text-decoration: underline dotted;
      text-decoration: underline dotted;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      font-weight: inherit;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }

    b,
    strong {
      font-weight: bolder;
    }

    code,
    kbd,
    samp,
    pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 1em;
    }

    small {
      font-size: 80%;
    }

    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }

    sub {
      bottom: -0.25em;
    }

    sup {
      top: -0.5em;
    }

    table {
      text-indent: 0;
      border-color: inherit;
      border-collapse: collapse;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: inherit;
      font-size: 100%;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;
      margin: 0;
      padding: 0;
    }

    button,
    select {
      text-transform: none;
    }

    button,
    [type='button'],
    [type='reset'],
    [type='submit'] {
      -webkit-appearance: button;
      background-color: transparent;
      background-image: none;
    }

    :-moz-focusring {
      outline: auto;
    }

    :-moz-ui-invalid {
      box-shadow: none;
    }

    progress {
      vertical-align: baseline;
    }

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      height: auto;
    }

    [type='search'] {
      -webkit-appearance: textfield;
      outline-offset: -2px;
    }

    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
      -webkit-appearance: button;
      font: inherit;
    }

    summary {
      display: list-item;
    }

    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    p,
    pre {
      margin: 0;
    }

    fieldset {
      margin: 0;
      padding: 0;
    }

    legend {
      padding: 0;
    }

    ol,
    ul,
    menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    textarea {
      resize: vertical;
    }

    input::-moz-placeholder,
    textarea::-moz-placeholder {
      opacity: 1;
      color: #9ca3af;
    }

    input::placeholder,
    textarea::placeholder {
      opacity: 1;
      color: #9ca3af;
    }

    button,
    [role="button"] {
      cursor: pointer;
    }

    :disabled {
      cursor: default;
    }

    img,
    svg,
    video,
    canvas,
    audio,
    iframe,
    embed,
    object {
      display: block;
      vertical-align: middle;
    }

    img,
    video {
      max-width: 100%;
      height: auto;
    }

    [hidden] {
      display: none;
    }

    *,
    ::before,
    ::after {
      --tw-border-spacing-x: 0;
      --tw-border-spacing-y: 0;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-pan-x: ;
      --tw-pan-y: ;
      --tw-pinch-zoom: ;
      --tw-scroll-snap-strictness: proximity;
      --tw-ordinal: ;
      --tw-slashed-zero: ;
      --tw-numeric-figure: ;
      --tw-numeric-spacing: ;
      --tw-numeric-fraction: ;
      --tw-ring-inset: ;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: rgb(59 130 246 / 0.5);
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-ring-shadow: 0 0 #0000;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-colored: 0 0 #0000;
      --tw-blur: ;
      --tw-brightness: ;
      --tw-contrast: ;
      --tw-grayscale: ;
      --tw-hue-rotate: ;
      --tw-invert: ;
      --tw-saturate: ;
      --tw-sepia: ;
      --tw-drop-shadow: ;
      --tw-backdrop-blur: ;
      --tw-backdrop-brightness: ;
      --tw-backdrop-contrast: ;
      --tw-backdrop-grayscale: ;
      --tw-backdrop-hue-rotate: ;
      --tw-backdrop-invert: ;
      --tw-backdrop-opacity: ;
      --tw-backdrop-saturate: ;
      --tw-backdrop-sepia: ;
    }

    ::backdrop {
      --tw-border-spacing-x: 0;
      --tw-border-spacing-y: 0;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-pan-x: ;
      --tw-pan-y: ;
      --tw-pinch-zoom: ;
      --tw-scroll-snap-strictness: proximity;
      --tw-ordinal: ;
      --tw-slashed-zero: ;
      --tw-numeric-figure: ;
      --tw-numeric-spacing: ;
      --tw-numeric-fraction: ;
      --tw-ring-inset: ;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: rgb(59 130 246 / 0.5);
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-ring-shadow: 0 0 #0000;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-colored: 0 0 #0000;
      --tw-blur: ;
      --tw-brightness: ;
      --tw-contrast: ;
      --tw-grayscale: ;
      --tw-hue-rotate: ;
      --tw-invert: ;
      --tw-saturate: ;
      --tw-sepia: ;
      --tw-drop-shadow: ;
      --tw-backdrop-blur: ;
      --tw-backdrop-brightness: ;
      --tw-backdrop-contrast: ;
      --tw-backdrop-grayscale: ;
      --tw-backdrop-hue-rotate: ;
      --tw-backdrop-invert: ;
      --tw-backdrop-opacity: ;
      --tw-backdrop-saturate: ;
      --tw-backdrop-sepia: ;
    }

    .col-span-3 {
      grid-column: span 3 / span 3;
    }

    .mx-6 {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }

    .mx-auto {
      margin-left: auto;
      margin-right: auto;
    }

    .my-2 {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .my-4 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .mt-5 {
      margin-top: 1.25rem;
    }

    .mt-8 {
      margin-top: 2rem;
    }

    .flex {
      display: flex;
    }

    .table {
      display: table;
    }

    .grid {
      display: grid;
    }

    .w-full {
      width: 100%;
    }

    .max-w-lg {
      max-width: 32rem;
    }

    .table-auto {
      table-layout: auto;
    }

    .grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .flex-col {
      flex-direction: column;
    }

    .items-center {
      align-items: center;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .space-y-2> :not([hidden])~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
    }

    .border {
      border-width: 1px;
    }

    .border-b-2 {
      border-bottom-width: 2px;
    }

    .border-black {
      --tw-border-opacity: 1;
      border-color: rgb(0 0 0 / var(--tw-border-opacity));
    }

    .border-gray-200 {
      --tw-border-opacity: 1;
      border-color: rgb(229 231 235 / var(--tw-border-opacity));
    }

    .bg-gray-200 {
      --tw-bg-opacity: 1;
      background-color: rgb(229 231 235 / var(--tw-bg-opacity));
    }

    .px-1 {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
    }

    .px-2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .pb-3 {
      padding-bottom: 0.75rem;
    }

    .text-center {
      text-align: center;
    }

    .text-3xl {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }

    .text-4xl {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }

    .text-base {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .text-lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    .text-sm {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .text-xs {
      font-size: 0.75rem;
      line-height: 1rem;
    }

    .font-bold {
      font-weight: 700;
    }

    .font-semibold {
      font-weight: 600;
    }

    .text-emerald-500 {
      --tw-text-opacity: 1;
      color: rgb(16 185 129 / var(--tw-text-opacity));
    }
    .text-red-500 {
      --tw-text-opacity: 1;
      color: rgb(239 68 68 / var(--tw-text-opacity));
    }
    
    .underline {
      text-decoration-line: underline;
    }
    
    .outline {
      outline-style: solid;
    }
  </style>
  <title>Eazy Retail Slaes Receipt</title>
</head>

<body>
  <main class='mx-6 my-4 '>
    <div class="">

      <div class="flex justify-center">
        <div class="flex flex-col">
          <span class="font-bold text-4xl text-center text-emerald-500">Smith Store</span>
          <span class="text-sm text-center">123 Billings Way</span>
          <span class="text-sm text-center">Lagos, NG 100234</span>
          <span class="text-xs text-center">Tel: +234 123 456 7890</span>
        </div>
      </div>
      <div class='border  w-full my-4'></div>

      <div class="flex flex-col items-center">
        <span class="font-bold">${saleSummary.customerName}</span>
        <span class="text-xs">${saleSummary.customerPhone}</span>
        ${createNoteSpan()}
      </div>
      <div class='border  w-full my-4'></div>

      <div class="flex flex-col items-center">
        <span class="font-bold">Order Summary</span>
        <span class="text-xs">Receipt ID: ${saleSummary.receiptID}</span>
        <span class="text-xs">Created: ${saleSummary.salesDate}</span>
      </div>

      <table class='max-w-lg mx-auto w-full table-auto mt-8'>
        <thead class='px-1 py-2 bg-gray-200'>
          <tr class='flex px-2'>
            <th class='flex w-full'>
              Pmode
            </th>
            <th class='flex w-full '>
              Items
            </th>
            <th class='flex w-full'>
              Qty
            </th>
            <th class='flex w-full'>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
        <tr class='flex justify-between px-2'>
        <td class='w-full'>
          ${saleSummary.paymentMethod}
        </td>
        <td class='w-full'>
          ${thousandSeperators(totalItemsBought)}
        </td>
        <td class='w-full'>
          ${thousandSeperators(totalQuantities)}
        </td>
        <td class='w-full'>
        ₦${thousandSeperators(saleSummary.total)}
        </td>
      </tr>

        </tbody>
      </table>
      <div class='border  w-full my-4'></div>

      <div class="grid grid-cols-4 max-w-lg mx-auto bg-gray-200 px-2 ">
        <span class='font-bold text-lg'>Name</span>
        <span class='font-bold text-lg'>Price</span>
        <span class='font-bold text-lg'>Qty</span>
        <span class='font-bold text-lg'>Total</span>
      </div>

      <div class="grid grid-cols-4 max-w-lg mx-auto px-2 space-y-2 text-sm">
      ${createDynamicSpan()}
       <!-- 
       <span>Maggi naija pot</span>
        <span>₦500</span>
        <span>2</span>
        <span>₦1,000</span>

        <span>Dangote Rice</span>
        <span>₦35,000</span>
        <span>4</span>
        <span>₦140,000</span>

        <span>Golden Penny SPaggethi</span>
        <span>₦1,500</span>
        <span>1</span>
        <span>₦1,500</span>

        <span>Indomie Onion Flavour</span>
        <span>₦3,500</span>
        <span>3</span>
        <span>₦10,500</span> 
        -->

      </div>

      <div class='border-b-2 border-black my-2'></div>

      <div class="grid grid-cols-4 max-w-lg mx-auto px-2 text-sm">

        <span class='col-span-3'>Sub total</span>
        <span>₦${thousandSeperators(saleSummary.subtotal)}</span>

        <span class='col-span-3'>Tax</span>
        <span>₦${thousandSeperators(saleSummary.tax)}</span>

        <span class='col-span-3'>Discount</span>
        <span>₦${thousandSeperators(saleSummary.discount)}</span>

        <span class='col-span-3 font-bold text-base'>Grand Total</span>
        <span class='font-bold text-base'>₦${thousandSeperators(
          saleSummary.total
        )}</span>
      </div>
      <div class='border-b-2 border-gray-200 my-2'></div>

      <div class="grid grid-cols-4 max-w-lg mx-auto px-2 text-sm">

        <span class='col-span-3'>Payment Recieved</span>
        <span>₦${thousandSeperators(saleSummary.cashReceived)}</span>

        ${changeOrShortSpan()}
      </div>
      <div class='border-b-2 border-gray-200 my-2'></div>

      <div class="mt-5">
        <p class='text-center'>
          Thank you for shopping with us. We hope to see you again soon.
        </p>
        <p class='text-center text-sm'>
          Created from Eazy Retail app
        </p>
        <p class='text-center text-sm'>
          by Ibukun Demehin❤
        </p>

      </div>
    </div>
  </main>
</body>

</html>
`;
  const [loadingBtn, setLoadingBtn] = useState(false);
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      setLoadingBtn(true);
      const { uri } = await Print.printToFileAsync({ html: htmlReceipt });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      setLoadingBtn(false);
    } catch (error) {
      console.error(error);
      setLoadingBtn(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <Image
            source={require('../../assets/onboarding/celebration.png')}
            style={styles.successImage}
          />

          <Text style={styles.successText}>Successful</Text>
          <Text style={styles.successSubText}>
            You have successfully made the sale
          </Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          mode='contained'
          style={styles.button}
          buttonColor={Colors['black']}
          textColor={Colors['white']}
          accessibilityLabel='Sign Up'
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          // loading={loadingBtn}
          // disabled={loadingBtn}
          onPress={() => handleCounterPageRedirect()}
        >
          Great
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          mode='outlined'
          style={styles.button}
          // buttonColor={Colors['black']}
          textColor={Colors['black']}
          accessibilityLabel='Sign Up'
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          loading={loadingBtn}
          disabled={loadingBtn}
          onPress={() => printToFile()}
        >
          Share Invoice
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SaleSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    // borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  successImage: {
    width: 300,
    height: 300,
    // resizeMode: 'contain',
    // borderRadius: 10,
  },
  successText: {
    fontSize: 24,
    fontFamily: 'Givonic-SemiBold',
    textAlign: 'center',
    marginTop: 20,
  },
  successSubText: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    textAlign: 'center',
    marginTop: 20,
    width: '70%',
    // borderWidth: 1,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    // height: 60,
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: Colors['grey-700'],
  },
  buttonContent: {
    // borderWidth: 1,
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },
});
