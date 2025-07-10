import React from 'react';
import ElectoralStructureCard from '../components/territorial/ElectoralStructureCard';
import EventsCard from '../components/territorial/EventsCard';
import PromotionCard from '../components/territorial/PromotionCard';
import SegmentCampaignCard from '../components/territorial/SegmentCampaignCard';
import MobilizationCard from '../components/territorial/MobilizationCard';

export default function TerritorialPage() {
  return (
    <div className="min-h-screen bg-background pt-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-white mb-8">Territorial</h1>
        
        {/* Grid layout for cards */}
        <div className="grid grid-cols-12 gap-8">
          {/* First row - larger cards */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ElectoralStructureCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <EventsCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <PromotionCard />
          </div>
          
          {/* Second row - smaller cards */}
          <div className="col-span-12 md:col-span-6">
            <SegmentCampaignCard />
          </div>
          <div className="col-span-12 md:col-span-6">
            <MobilizationCard />
          </div>
        </div>
      </div>
    </div>
  );
}