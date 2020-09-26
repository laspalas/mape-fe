import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title=""
        breadcrumbs={[{ name: 'Osnove informacije', active: true }]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet
        blandit turpis, nec venenatis ante molestie mattis. Nunc a elementum
        nisi, vitae pretium neque. Proin eu dui viverra, fringilla augue in,
        iaculis mauris. Mauris consectetur velit quis lectus faucibus porta.
        Nullam fringilla varius commodo. Pellentesque sed iaculis nunc. Aenean
        lobortis leo posuere mauris efficitur pellentesque. Donec eleifend quam
        sit amet lacus blandit, non ullamcorper dui facilisis. Pellentesque
        euismod semper ipsum non gravida. Quisque ultrices et lorem vel cursus.
        Vestibulum id lorem sed lorem dapibus tincidunt vitae sed odio.
        Suspendisse ut odio eget lacus mollis ullamcorper sed quis lectus. Donec
        eu commodo lacus, eu iaculis urna. Proin vel massa sed odio blandit
        fringilla ac eget dolor. Proin id pulvinar nulla, ac accumsan odio.
        Mauris ac lacinia nunc. Donec nec ipsum faucibus, cursus diam non,
        posuere nulla. Nullam non fringilla lectus. Nullam id est vel nulla
        euismod ornare. Curabitur tempus imperdiet massa, quis vestibulum orci
        commodo et. Suspendisse aliquet viverra ante, eget accumsan est
        facilisis nec. Fusce tempus lacus odio, in feugiat lorem tempor id.
        Morbi eget blandit enim, ac commodo nisi. Aliquam sit amet tempor leo.
        Donec euismod urna eu sodales interdum. Sed vestibulum lectus a dapibus
        volutpat. In imperdiet euismod nisi, nec ultricies ipsum dictum at.
        Praesent id erat sed risus imperdiet fermentum nec at urna. Aenean
        faucibus dolor et mauris lobortis, et consectetur mi semper. Sed
        vulputate velit sed tortor ornare tempor. Suspendisse mattis sem turpis,
        eu tempor lectus dictum vitae. Duis facilisis, velit a malesuada
        vehicula, ligula erat sollicitudin sem, a placerat nisl nibh in tellus.
        Donec pellentesque condimentum cursus. Vivamus varius, purus ac
        convallis pellentesque, urna est aliquet est, non pulvinar leo libero at
        urna. Vivamus porttitor luctus suscipit. Etiam commodo in arcu quis
        tincidunt. Aliquam erat volutpat. Duis facilisis, sapien vitae molestie
        consequat, tortor risus lacinia tortor, et posuere felis leo at eros.
        Nam eget lacinia justo. Fusce sed dui vitae nisl bibendum eleifend. Ut
        tortor magna, imperdiet ut erat auctor, pulvinar accumsan tellus.
        Maecenas in luctus metus, at cursus diam. Duis est nunc, malesuada vel
        lacus a, lobortis gravida neque. In dapibus sit amet turpis et dapibus.
        Pellentesque risus est, bibendum eleifend pellentesque quis, varius eu
        tortor. Donec id molestie augue. Mauris consectetur odio arcu. Vivamus
        hendrerit eros sed volutpat condimentum. Nulla volutpat neque at
        vulputate auctor. Curabitur tempus vestibulum mi, non iaculis orci
        blandit et. Duis mauris lorem, tempus ut ligula vel, auctor interdum
        mauris. In dapibus ex et tempus ornare. Sed eget tortor fermentum,
        ornare urna in, commodo nisl. Proin elementum feugiat ligula, vel
        vulputate eros aliquam eget. Nunc vitae blandit turpis, vitae eleifend
        tortor. Fusce bibendum pellentesque purus ac bibendum. Sed imperdiet dui
        sodales nulla bibendum, eleifend posuere massa ullamcorper. Ut vitae
        porttitor tortor. Nulla vitae ligula quis nibh fermentum luctus. Sed
        ultrices elementum justo, ultricies feugiat odio tempus a. Nulla tempus
        massa vitae tellus tincidunt, vitae interdum dui scelerisque. Vestibulum
        a maximus erat. Duis tincidunt nisl gravida porta suscipit. Ut
        scelerisque velit nec massa mollis, vitae pellentesque tortor mollis.
        Vestibulum libero enim, condimentum at molestie ac, malesuada ut urna.
        Ut tempus pharetra enim et ornare. Proin mauris ante, efficitur
        venenatis posuere a, bibendum et metus. Cras ac cursus dui, id feugiat
        dolor. In ac interdum justo, nec maximus justo. Aenean finibus ante
        tortor, quis volutpat lacus congue vitae. Fusce in scelerisque ipsum,
        vitae malesuada eros. Integer id dapibus sem. Cras nec porta eros, at
        dignissim lacus. Ut lectus nibh, eleifend vitae interdum id, porttitor
        quis quam. Phasellus accumsan fermentum scelerisque. Vestibulum ut massa
        orci. Praesent ac nunc dolor. Donec molestie est dui, at tincidunt ante
        porta sit amet. Integer iaculis elit venenatis porttitor tincidunt. Cras
        vulputate lorem pretium, consectetur turpis vel, imperdiet nisi. Etiam
        consectetur nec ipsum vel tempus. Fusce ullamcorper, dui nec convallis
        maximus, dolor erat sagittis nulla, sit amet facilisis risus mauris
        vulputate erat. Ut non ipsum erat. Nulla egestas consequat risus sit
        amet suscipit. Mauris varius tellus non nisl cursus, vel blandit purus
        porta. Proin a mauris orci. Ut volutpat convallis enim eget cursus.
        Proin dapibus lectus a sapien imperdiet, in vulputate velit varius.
        Curabitur felis justo, rhoncus eget gravida et, hendrerit non urna.
        Maecenas arcu leo, dictum eget tellus id, sodales suscipit dui.
        Vestibulum lacinia finibus justo, ut elementum urna ultrices non.
        Vivamus cursus pharetra arcu et aliquam. Nullam odio lacus, pulvinar at
        sapien et, varius egestas felis. Duis convallis sapien sapien, nec
        suscipit elit semper pretium. Sed eros metus, dictum non augue sed,
        efficitur tempor nisl. Vivamus fringilla felis sit amet metus euismod,
        vel vulputate ex feugiat. Proin gravida sapien magna, vitae consequat
        eros laoreet ut. Pellentesque quis felis id elit porttitor pharetra sed
        in magna. Proin commodo blandit sagittis. Cras eu arcu rutrum, bibendum
        ante id, aliquam erat. Quisque sit amet odio sem. Suspendisse in ornare
        purus, imperdiet convallis dolor. Proin et risus tincidunt, bibendum
        tellus gravida, ornare velit. Sed et tortor porta, vulputate diam a,
        faucibus lectus. Integer ultrices purus nec velit efficitur consectetur.
        Proin eu dolor nec leo egestas tristique vitae non eros. Pellentesque
        suscipit consequat est a semper. Praesent efficitur consectetur tortor
        sed scelerisque. Nam faucibus, ex a placerat pretium, lorem diam mollis
        odio, ac hendrerit lacus urna nec nunc. Vestibulum tincidunt enim
        lectus, blandit rhoncus diam finibus sed. Nullam ut laoreet lacus. Etiam
        bibendum massa non enim vehicula vestibulum. Aliquam egestas efficitur
        purus sit amet volutpat. Sed cursus, erat sed convallis molestie, elit
        neque congue lectus, eget porta ipsum quam a erat. Aliquam viverra
        feugiat felis vel suscipit. Cras rutrum molestie dictum. Suspendisse
        auctor, purus et facilisis malesuada, lectus leo egestas orci, venenatis
        bibendum nulla leo ac nisi. Vestibulum felis odio, aliquet quis aliquet
        in, semper consectetur libero. Suspendisse sodales faucibus turpis,
        sodales fringilla libero. Aenean tristique, diam a pulvinar convallis,
        orci arcu condimentum felis, at eleifend nibh leo vitae massa. Nam
        molestie consectetur enim eget volutpat. Maecenas luctus elit sit amet
        sodales facilisis. Donec posuere sem magna, eget bibendum leo tincidunt
        sed. In hac habitasse platea dictumst. Praesent cursus ornare lacus quis
        vehicula. Fusce a interdum dui, quis aliquam magna. Nullam et eleifend
        magna. Duis vel tellus et magna dapibus blandit quis ac risus. Aliquam
        erat volutpat. Phasellus sit amet feugiat ante. Quisque consectetur leo
        ut purus vehicula, imperdiet mollis erat maximus. Duis sollicitudin sem
        vitae imperdiet semper. Phasellus eleifend semper libero, sed finibus
        eros venenatis non. Donec vel egestas neque. Sed in ligula leo. Nullam
        lacinia ipsum ipsum, sed posuere mi condimentum non. Phasellus id
        fringilla enim. Suspendisse scelerisque metus ut metus malesuada, eu
        lacinia nisl eleifend. Nam accumsan hendrerit tortor non bibendum.
        Quisque commodo fermentum nisl sit amet lacinia. Integer sit amet
        pretium libero, ac sollicitudin dolor. Sed imperdiet turpis vel
        ullamcorper fermentum. Aenean efficitur viverra elit at lacinia. Fusce
        sed erat id ipsum mattis venenatis. Nulla eu rutrum lorem, non commodo
        magna. Curabitur arcu libero, imperdiet eu est eu, vehicula aliquet
        erat. Donec vel finibus ligula, a lacinia tellus. Nulla eleifend mauris
        a purus venenatis, eu efficitur ex tempor. Aliquam mollis nisl turpis,
        nec malesuada urna rhoncus ac. Suspendisse elementum eros felis. Morbi
        vehicula, purus eu maximus convallis, velit dui sollicitudin ipsum,
        vitae congue massa leo a mi. Donec sed urna vestibulum, fermentum lectus
        sit amet, pellentesque magna. Maecenas lobortis vulputate sagittis. In
        scelerisque dolor quis finibus rhoncus. Curabitur dictum massa at mauris
        sodales, in pretium erat suscipit. Etiam ac fermentum erat. Aenean ut
        nulla at leo tincidunt congue vel vitae sem. Pellentesque vel risus
        purus. Aliquam et tempus elit. Duis imperdiet quam sit amet facilisis
        mollis. Fusce v
        {/* <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Total Expense</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Cost of sales{' '}
                  <Badge color="secondary">$3000</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Management
                  costs <Badge color="secondary">$1200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Financial costs{' '}
                  <Badge color="secondary">$800</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Other operating
                  costs <Badge color="secondary">$2400</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="People you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Reviews"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="30+ Shares"
            subtitle="New Shares"
          />
        </CardGroup>

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Products</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Users</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}
              >
                <CardTitle>
                  <MdInsertChart /> Sales
                </CardTitle>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [10000, 15000, 5000, 10000, 5000, 10000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}
              >
                <CardTitle>
                  <MdInsertChart /> Revenue
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute', right: 0 }}
              >
                <CardTitle>
                  <MdInsertChart /> Profit
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardDeck style={{ marginBottom: '1rem' }}>
          <Card
            body
            style={{
              overflowX: 'auto',
              paddingBottom: '15px',
              height: 'fit-content',
              paddingTop: 'inherit',
            }}
          >
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card
            body
            style={{
              overflowX: 'auto',
              paddingBottom: '15px',
              height: 'fit-content',
              paddingTop: 'inherit',
            }}
          >
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row> */}
      </Page>
    );
  }
}
export default DashboardPage;
