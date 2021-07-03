import React, { useState } from 'react';
import { useAppSelector } from 'hooks/useRedux';
import { Button, TextInput, Tabs } from 'design-system/index';

const ProductPageTabs = () => {
  const settings = useAppSelector((state) => state.settings);
  const [pincode, setPincode] = useState('');
  const [pincodeState, setPincodeState] = useState('');

  // tab names
  const tabs = ['INFO', 'SIZE & FIT', 'DELIVERY'];
  return (
    <div>
      <div className="">
        <Tabs tabs={tabs}>
          <div key={tabs[0]} className="rf-text-sm rf-line-height-1_75">
            Best known for their more-is-more gold-hued Baroque designs and
            opulent Medusa heads, Versace takes a more understated approach to
            everyday style for AW21. In a minimalist monochrome colourway, this
            short-sleeve slim-fit T-shirt has been simply printed with the
            House&apos;s logo lettering at the chest.
          </div>
          <div key={tabs[1]} className="rf-text-sm">
            <p className="rf-margin-b-lg rf-text-sm rf-line-height-1_75">
              This piece fits true to size. We recommend you get your regular
              size. Cut for a slim fit. Made with a mid-weight non-stretch
              fabric.
            </p>
            <p className="rf-opacity-40 rf-text-sm rf-margin-b-xs">
              Model Measurements
            </p>
            <p className="rf-text-sm rf-line-height-2">
              Height: 6 ft 3 in <br />
              bust/Chest: 35.8 in <br />
              Hips: 34.6 in <br />
              Waist: 28 in
            </p>
          </div>
          <div key={tabs[2]} className="rf-text-sm rf-line-height-1_75">
            Currently, we are only able to deliver to Tier-1 cities like Mumbai,
            Bangalore, Kolkata etc. <br />
            <br />
            Enter your 6-digit pincode below to check. <br />
            <br />
            <div className="rf-flex rf-flex-h">
              <div style={{ marginRight: '16px', width: '240px' }}>
                <TextInput
                  name="pincode"
                  theme="dark"
                  value={pincode}
                  placeholder="Enter pincode"
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                />
              </div>
              <div className={pincode?.length === 6 ? '' : 'rf-opacity-0'}>
                <Button
                  size="small"
                  responsive={false}
                  onClick={() => {
                    let isValid = false;
                    settings.availablePincodes.forEach((code: string) => {
                      if (RegExp(code).test(pincode)) {
                        isValid = true;
                      }
                    });
                    if (isValid) {
                      setPincodeState('deliverable');
                    } else {
                      setPincodeState('not-deliverable');
                    }
                  }}
                >
                  Check
                </Button>
              </div>
            </div>
            <div className="rf-margin-t-sm">
              {pincodeState === 'deliverable' &&
                'Great! We can deliver to this pincode!'}
              {pincodeState === 'not-deliverable' &&
                'Uhh oh... sorry, we cannot deliver to this pincode'}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPageTabs;
