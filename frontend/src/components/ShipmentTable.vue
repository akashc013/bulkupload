<template>
  <div class="table-container">
    <table>
      <thead>
        <tr class="table-head">
          <th>Shipment Type</th>
          <th>Order Number</th>
          <th>Order Type</th>
          <th>Primary Mode</th>
          <th>Expected Delivery Date</th>
          <th>Incoterm</th>
          <th>Source Location</th>
          <th>Destination Location</th>
          <th>Cargo Type</th>
          <th>Material Code</th>
          <th>Quantity</th>
          <th>Quantity Unit</th>
          <th>Shipment Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shipment in shipments" :key="shipment._id">
          <td>{{ shipment.shipmentType }}</td>
          <td>{{ shipment.orderNumber }}</td>
          <td>{{ shipment.orderType }}</td>
          <td>{{ shipment.primaryMode }}</td>
          <td>{{ formatDateTime(shipment.expectedDeliveryDate) }}</td>
          <td>{{ shipment.incoterm }}</td>
          <td>{{ shipment.sourceLocation.locationName }}</td>
          <td>{{ shipment.destinationLocation.locationName }}</td>
          <td>{{ shipment.cargoType }}</td>
          <td>{{ shipment.materialCode }}</td>
          <td>{{ shipment.quantity }}</td>
          <td>{{ shipment.quantityUnit }}</td>
          <td>{{ shipment.shipmentNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useShipmentStore } from '@/stores/store'
import { computed } from 'vue'

const shipmentStore = useShipmentStore()

const shipments = computed(() => shipmentStore.shipments)

const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>
